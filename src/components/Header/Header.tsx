import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IHeader {

}

function Header({ }: IHeader) {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography
            variant='h5'
            component='span'
          >
            Contacts
          </Typography>
        </Toolbar>

      </AppBar>
    </Box>
  );
}

export default Header;