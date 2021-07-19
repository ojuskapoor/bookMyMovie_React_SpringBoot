import React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';


export default function ArtistsTitlebarImageList({ aristsDataList }) {

    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={210} gap={8} >
            {aristsDataList.map((item) => (
                <ImageListItem key={item.first_name} >
                    <img
                        srcSet={`${item.profile_url}?w=248&fit=crop&auto=format 1x,
                    ${item.profile_url}?w=248&fit=crop&auto=format&dpr=2 1x`}
                        alt={item.first_name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.first_name + " " + item.last_name}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}


