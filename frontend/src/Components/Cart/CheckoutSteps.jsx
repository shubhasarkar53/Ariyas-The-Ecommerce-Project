/* eslint-disable no-unused-vars */
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { MdLocalShipping } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import PropTypes from "prop-types";
import "./CheckoutSteps.scss";
const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      lable: <Typography> Shipping Details</Typography>,
      icon: <MdLocalShipping className="ico" />,
    },
    {
      lable: <Typography> Confirm Order</Typography>,
      icon: <MdOutlineConfirmationNumber className="ico"  />,
    },
    {
      lable: <Typography> Payment Details</Typography>,
      icon: <MdOutlinePayment className="ico"  />,
    }
  ];

  const stepStyle = {
    textTransform: "capitalize",
    padding:"2rem",
    display: "flex",
    gap: "10px",
  };

  return (
    <Fragment>
      <Stepper activeStep={activeStep} alternativeLabel style={stepStyle}>
        {steps.map((step, index) => (
          <Step key={step.lable} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
            <StepLabel icon={step.icon} 
            style={{color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)" }}>
              {step.lable}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

CheckoutSteps.propTypes = {
  activeStep: PropTypes.number,
};

export default CheckoutSteps;
