

const { catchAsyncErr } = require("../middleWares/catchAsyncError");
const path = require('path');
const fs = require('fs');

const { sellerRegSendMail } = require("../utills/sellerRegSendMail");
const SellerInfo = require("../models/SellerInfo"); //Schema
const ErrorHandler = require("../utills/errorHandler");
const User = require("../models/User");


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

// Helper function to delete files
const deleteFiles = (filePaths) => {
    filePaths.forEach(filePath => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${filePath}`, err);
            } else {
                console.log(`Successfully deleted file: ${filePath}`);
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
            return next(new ErrorHandler(400, `Field ${field} is required.`));
        }
    }

    if (!files) {
        return next(new ErrorHandler(400, "No files were uploaded."));
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
                    return next(new ErrorHandler(400, `Failed to upload file: ${fileField}`));
                })
            );
        }
    }

    try {
        await Promise.all(fileHandlers);

        const duplicateMail = await SellerInfo.findOne({ email: req.body.email });
        if (duplicateMail) {
            throw new ErrorHandler(400, `You have already requested to become a seller.`);
        }

        // Create a new SellerInfo instance
        const sellerInfo = new SellerInfo({
            user: req.user.id, //  user info from the request
            agencyName: req.body.agencyName,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            aadharNumber: req.body.aadharNumber,
            panNumber: req.body.panNumber,
            pincode: req.body.pincode,
            postOffice: req.body.postOffice,
            policeStation: req.body.policeStation,
            address: req.body.address,
            landmark: req.body.landmark,
            town: req.body.town,
            state: req.body.state,
        });

        // Save the seller info to the database
        await sellerInfo.save();

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

        // Schedule file deletion after 10 seconds
        setTimeout(() => deleteFiles(filePaths), 10000); // 10 seconds delay

        res.status(201).json({
            success: true,
            message: "Files uploaded & email sent successfully.",
        });

    } catch (error) {
        // Delete files immediately if there's an error
        deleteFiles(filePaths);

        // If the error is not an instance of ErrorHandler, create one
        if (!(error instanceof ErrorHandler)) {
            error = new ErrorHandler(500, error);
        }

        return next(error);
    }
});



exports.getAllRequestedSeller = catchAsyncErr(async (req,res,next) => {
    const sellers = await SellerInfo.find().populate('user', 'role');
  if (!sellers) {
    return next(new ErrorHandler("User not availabe", 400));
  }
  res.status(200).json({
    success: true,
    sellers,
  });
})


exports.getAllVerifiedseller = catchAsyncErr(async (req,res,next) => {
    const verifiedSellers = await User.find({role:"seller"});
  if (!verifiedSellers) {
    return next(new ErrorHandler("User not availabe", 400));
  }
  res.status(200).json({
    success: true,
    verifiedSellers,
  });
})


