import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Mark from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { Button } from '../index';
import {
  Container,
  NavWrapper,
  SettingsWrapper,
  StyledUL,
  StyledLink,
} from './Sidebar.styling';

interface LinkProps {
  onClick?: () => MouseEvent;
}

const Sidebar = ({ onClick }: LinkProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <div className='menu'>
        <Mark
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          Menu
        </Mark>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to='/property'>Property</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/guests'>Guests</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/assistants'>Assistants</Link>
          </MenuItem>
        </Menu>
      </div>
      <NavWrapper>
        <StyledUL>
          <li>
            <StyledLink to='/properties'>
              <h4>Properties</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/guests'>
              <h4>Guests</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/assistants'>
              <h4>Assistants</h4>
            </StyledLink>
          </li>
        </StyledUL>
      </NavWrapper>
      <SettingsWrapper>
        <StyledUL>
          <li>
            <StyledLink to='/settings'>
              <h4>Settings</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/logout'>
              {/* <Button onClick={} t='button' data-testid='signout'>Sign Out</Button> */}
              <Button className='button-sign-out' text='Sign Out' />
            </StyledLink>
          </li>
        </StyledUL>
      </SettingsWrapper>
    </Container>
  );
};

export default Sidebar;
