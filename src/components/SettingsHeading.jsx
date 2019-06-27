import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, FormControlLabel, Checkbox,
  Divider,
} from '@material-ui/core';

function SettingsHeading({ usingDefault, setUsingDefault, headingText }) {
  return (
    <Grid container item spacing={3} xs={12} justify="center">
      <Grid item md xs={12}>
        <Typography variant="h4">
          { headingText }
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <FormControlLabel
          control={
            <Checkbox checked={usingDefault} onChange={() => setUsingDefault(!usingDefault)} />
          }
          label="Use default settings"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
}

SettingsHeading.propTypes = {
  usingDefault: PropTypes.bool.isRequired,
  setUsingDefault: PropTypes.func.isRequired,
  headingText: PropTypes.string.isRequired,
};

export default SettingsHeading;
