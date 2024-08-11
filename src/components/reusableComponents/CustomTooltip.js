import React from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    fontSize: '14px',
    fontFamily: 'Inconsolata',
    color: '#fbc51b',
  },
}))
