import React from 'react';
import { styled } from '@material-ui/styles';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: ({nopadding}) => nopadding ? 0 : 12,
  },
};

export const Row = styled('div')(styles.row);

