import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
// Light theme settings
const primaryColor = '#673ab7'
export default createMuiTheme({
  palette: {
    primary: {
      main: '#673ab7'
    },
    secondary: {
      main: '#ffb74d'
    }
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        backgroundColor: primaryColor
      }
    },
    MuiBottomNavigationAction: {
      root: {
        color: grey[400],
        '&$selected': {
          color: '#fff'
        }
      },
      selected: {
        color: '#fff'
      },
      label: {
        '&$selected': {
          fontSize: '8pt'
        }
      }
    },
    MuiCircularProgress: {
      root: {
        margin: 'auto'
      }
    }
  }
});