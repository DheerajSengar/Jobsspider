import makeStyles from "@mui/styles/makeStyles";
const homeStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    fontFamily: "Ubuntu",
    backgroundColor: "#f3f2f1",
  },
  box: {
    marginTop: 20,
    width: 400,
    height: 400,
    border: "1px solid #dedede",
    borderRadius: 7,
    padding: 0,
    backgroundColor: "white",
  },

  helperTextStyle: {
    color: "#d32f2f",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    marginTop: "3px",

    marginBottom: "0",
  },

});
export { homeStyles };
