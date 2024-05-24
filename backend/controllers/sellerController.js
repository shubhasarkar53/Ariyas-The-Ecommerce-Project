

const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const path = require('path');
const fs = require('fs');

const { sellerRegSendMail } = require("../utills/sellerRegSendMail");


// Ensure the directory exists
const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// Helper function to handle file uploads
const handleFileUpload = (file, uploadsDir) => {
    const filePath = path.join(uploadsDir, Date.now() + "_" + file.name);
    return new Promise((resolve, reject) => {
        file.mv(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    filename: file.name,
                    path: filePath
                });
            }
        });
    });
};

exports.registerSeller = catchAsyncErr(async (req, res, next) => {
    const files = req.files;
    const uploadsDir = path.join(__dirname, 'files');
    ensureDirectoryExists(uploadsDir);

    const requiredFields = [
        'agencyName', 'name', 'phone', 'email', 'aadharNumber', 'panNumber', 'pincode',
        'postOffice', 'policeStation', 'address', 'landmark', 'town', 'state'
    ];

    // Check if all required text fields are present
    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                success: false,
                message: `Field ${field} is required.`
            });
        }
    }

    if (!files) {
        return res.status(400).json({
            success: false,
            message: "No files were uploaded."
        });
    }

    const fileFields = [
        'aadharFile', 'panFile', 'addressProofFile', 'bankAccountFile', 'gstCertificate'
    ];

    const fileHandlers = [];
    const attachments = [];
    const filePaths = []; // Store file paths for deletion

    // Handle file uploads
    for (let fileField of fileFields) {
        if (files[fileField]) {
            fileHandlers.push(
                handleFileUpload(files[fileField], uploadsDir).then(result => {
                    attachments.push(result);
                    filePaths.push(result.path);
                }).catch(err => {
                    throw new Error(`Failed to upload file: ${fileField}`);
                })
            );
        }
    }

    try {
        await Promise.all(fileHandlers);

        const emailOptions = {
            email: req.body.email, // Admin's email address or seller's email
            subject: `New Seller Registration - ${req.body.email}`,
            message: 'New seller has registered. Please find the attached documents.',
            html: `
                <p>New seller ${req.body.name} has registered with the following details:</p>
                <ul>
                    ${requiredFields.map(field => `<li><strong>${field}:</strong> ${req.body[field]}</li>`).join('')}
                </ul>
                <p>Please find the attached documents.</p>
            `,
            attachments: attachments
        };

        // Send email
        await sellerRegSendMail(emailOptions);

        // Delete files after 15 seconds
        setTimeout(() => {
            filePaths.forEach(filePath => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete file: ${filePath}`, err);
                    } else {
                        console.log(`Successfully deleted file: ${filePath}`);
                    }
                });
            });
        }, 10000); // 10 seconds delay

        res.status(201).json({
            success: true,
            message: "Files uploaded, email sent, and files will be deleted in 10 seconds"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "File upload or email sending failed"
        });
    }
});
