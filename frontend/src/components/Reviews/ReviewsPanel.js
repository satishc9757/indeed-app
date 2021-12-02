import React from 'react'
import ReviewCard from './ReviewCard'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const ReviewsPanel = (props) => {


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      console.log("getting called aganin")

    return (
        <div><Stack spacing={2}>
            {props.original}
            </Stack>
        </div>
    )
}

export default ReviewsPanel
