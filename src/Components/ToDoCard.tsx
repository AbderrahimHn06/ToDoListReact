import { useContext } from "react";
import { Colors } from "../ThemeProvider";
import type { CSSProperties } from "react";

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// MUI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import UndoIcon from '@mui/icons-material/Undo';

export default function ToDoCard({data, handleDone, handleEdit, handleDelete, handleUndo}: any) {
  const colors = useContext(Colors);

  const styles: { [key: string]: CSSProperties } = {
    card: {
      width: "100%",
      direction: "rtl",
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    details: {
      direction: "rtl",
      backgroundColor: colors.secondary,
      flexGrow: 1,
    },
    todotitle: {
      fontWeight: "bold",
      color: colors.text,
      fontSize: 18,
    },
    todoinfo: {
      fontWeight: "400",
      color: colors.text,
      fontSize: 14,
    },
  };

  function ButtonsSection() {
    const fabStyle = {
      width: 40,
      height: 40,
      minHeight: 40,
      alignSelf: "center",
    };

    return (
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Fab size="small" sx={fabStyle} onClick={() => data.status == 'current' ? handleDone(data.id) : handleUndo(data.id)}>
          {data.status == 'current'? <CheckIcon sx={{ color: "#abb25eff" }} /> : <UndoIcon/>}
        </Fab>

        <Fab size="small" sx={fabStyle} onClick={() => handleEdit(data)}>
          <EditIcon />
        </Fab>

        <Fab size="small" sx={fabStyle} onClick={() => handleDelete(data.id)}>
          <DeleteForeverIcon sx={{ color: colors.error }} />
        </Fab>
      </Box>
    );
  }

  return (
    <div style={styles.card}>
      <Accordion style={styles.details}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: colors.text }} />}
        >
          <Typography component="span" style={styles.todotitle}>{data.title}</Typography>
        </AccordionSummary>

        <AccordionDetails style={styles.todoinfo}>{data.description}</AccordionDetails>
      </Accordion>

      <ButtonsSection />
    </div>
  );
}
