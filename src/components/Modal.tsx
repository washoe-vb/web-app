import { PropsWithChildren } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { Theme } from "@mui/material/styles";
import {
  CardContent,
  CardHeader,
  IconButton,
  Modal as MuiModal,
} from "@mui/material";
import Card from "@mui/material/Card";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function Modal({
  children,
  onClose,
  isOpen,
}: PropsWithChildren<ModalProps>) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const desktopStyles = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };

  const mobileStyles = {
    position: "absolute" as "absolute",
    inset: "0 0 0 0",
    bgcolor: "background.paper",
    p: 1,
  };

  return (
    <MuiModal open={isOpen}>
      <Card sx={isMobile ? mobileStyles : desktopStyles}>
        <CardHeader
          action={
            onClose && (
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            )
          }
          title="Edit word"
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {children}
        </CardContent>
      </Card>
    </MuiModal>
  );
}
