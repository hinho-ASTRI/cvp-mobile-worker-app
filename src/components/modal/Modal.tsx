import React from "react";
import { StyleSheet, View } from "react-native";
import RNModal from "react-native-modal";

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  animationIn?: "slideInUp" | "slideInDown";
  animationOut?: "slideOutUp" | "slideOutDown";
};

export const Modal = ({
  isVisible = false,
  children,
  justifyContent,
  animationIn,
  animationOut,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      style={{
        margin: 0,
        justifyContent,
      }}
      isVisible={isVisible}
      animationInTiming={1000}
      animationIn={animationIn}
      animationOut={animationOut}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}
    >
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const ModalHeader = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
