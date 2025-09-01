import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles ({
    root: {
      width:'100%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontFamily:'Ubuntu'
    },
    box:{
        width:1000,
        height:"auto",
        border:'1px solid #636e72',
        borderRadius:5,
        padding:10
    },

    helperTextStyle:
    {color: "#d32f2f",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
        textAlign: "left",
        marginTop: "3px",
        marginBottom: "0",
  
    }
  });
  export {useStyles}