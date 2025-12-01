import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem } from "@mui/material";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationError, setValidationError] = useState<string[]>([]);

  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    }
    catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error 
        && typeof(error as {message:unknown}).message ==="string") {
          const errorArray = (error as {message: string}).message.split(",");
          setValidationError(errorArray);
        }
    }
  }

  return (

    <Container maxWidth="lg">
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => trigger400Error().catch(err=>console.log(err))}>
          {" "}
          400
        </Button>
        <Button variant="contained" onClick={() => trigger401Error().catch(err => console.log(err))}>
          {" "}
          401
        </Button>
        <Button variant="contained" onClick={() => trigger404Error().catch(err => console.log(err))}>
          {" "}
          404
        </Button>

        <Button variant="contained" onClick={() => trigger500Error().catch(err => console.log(err))}>
          {" "}
          500
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          {" "}
          Validation
        </Button>
      </ButtonGroup>
      {validationError.length > 0 && (
        <Alert severity = "error"> 
          <AlertTitle> Validation Errors</AlertTitle>
          <List>
            {validationError.map(err => (
              <ListItem key ={err}> {err} </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
