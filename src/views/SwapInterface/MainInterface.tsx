import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SwapTabPanel from './SwapTabPanel';
import InfoTabPanel from './InfoTabPanel';
import Notification from '../../components/Notification';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#279e75',
  },
});

interface StyledTabProps {
  label: string;
  component?: React.FC
}


const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'green',
  '&.Mui-selected': {
    color: '#ffffff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#fdfdfd',
  },
}));



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function MainInterface() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ color: '#ffffff' }}>
        <StyledTabs 
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            >
          <StyledTab sx={{fontWeight: '700', color: '#fdfdfd', margin: '0', padding: '0', textTransform: 'none'}} label="Swap" {...a11yProps(0)} />
          <StyledTab sx={{fontWeight: '700', color: '#fdfdfd', margin: '0', padding: '0', textTransform: 'none'}} label="Info" {...a11yProps(1)} />
          <StyledTab label='' component={Notification} />
              
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SwapTabPanel/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InfoTabPanel/>
      </TabPanel>
      
    </Box>
  );
}
