import React from "react";

import "./OverlayDrawer.scss";

type OverlayDrawerProps = {
  isOpen: boolean;
  header: {
    visibility: boolean;
    value: string | JSX.Element;
  };
  expandDrawerContent: JSX.Element;
  collapsedDrawerContent: JSX.Element;
  handleClose?: () => void;
  closeButton?: boolean;
  drawerBackground?: string;
  expandDrawerWidth?: string;
  collapsedDrawerWidth?: string;
  closeButtonMarkup?: JSX.Element;
  position?: "left" | "right";
  completeCollapse?: boolean;
  zIndex?: number;
};

export const OverlayDrawer = (props: OverlayDrawerProps): JSX.Element => {
  const {
    isOpen,
    header,
    expandDrawerContent,
    collapsedDrawerContent,
    handleClose = () => {},
    closeButton = false,
    closeButtonMarkup = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enableBackground="new 0 0 40 40">
        <line x1="15" y1="15" x2="25" y2="25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></line>
        <line x1="25" y1="15" x2="15" y2="25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10"></line>
      </svg>
    ),
    expandDrawerWidth = "256px",
    collapsedDrawerWidth = "75px",
    drawerBackground = "white",
    position = "left",
    completeCollapse = false,
    zIndex = 2000,
  } = props;
  const containerStyle = () => {
    const left = position === "left" ? { left: "0px" } : { right: "0px" };
    return {
      ...left,
      zIndex,
    };
  };

  const contentStyle = () => {
    const left = position === "left" ? { left: "0px" } : { right: "0px" };
    const widthStyle = () => {
      if (!isOpen) {
        if (completeCollapse) return "0px";
        return collapsedDrawerWidth;
      }
      return expandDrawerWidth;
    };
    return {
      ...left,
      backgroundColor: drawerBackground,
      width: widthStyle(),
    };
  };

  return (
    <div style={containerStyle()} className="drawerContainer ak-drawer-wrapper">
      <div
        role="button"
        tabIndex={-1}
        className={`drawerMask ${isOpen ? "" : "drawerMaskClose"}`}
        onClick={() => {
          handleClose();
        }}
      />
      <div className="drawerContent" style={contentStyle()}>
        {header.visibility && isOpen && (
          <div className="drawerHeader">
            {position === "left" && <div className="drawerTitle">{header.value}</div>}
            {closeButton && (
              <button type="button" className="drawerCloseBtn" onClick={handleClose}>
                {closeButtonMarkup}
              </button>
            )}
            {position === "right" && <div className="drawerTitle">{header.value}</div>}
          </div>
        )}

        <div>{isOpen ? expandDrawerContent : completeCollapse ? <></> : collapsedDrawerContent}</div>
      </div>
    </div>
  );
};
