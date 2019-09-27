import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import withI18N, { getMessage } from "../../util/I18NWrapper";
import { injectIntl } from "react-intl";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import UnFavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentsIcon from "@material-ui/icons/CommentOutlined";
import palette from "../../util/CyVersePalette";
import intlData from "./messages";
import build from "../../util/DebugIDUtil";
import ids from "./ids";

/**
 *
 * @author sriram
 *
 * Menu items for Apps Tile and table view
 *
 */
const useStyles = makeStyles((theme) => ({
    menuItem: {
        padding: 5,
    },
    toolbarItemColor: {
        color: palette.darkBlue,
    },
}));

function AppMenu(props) {
    const {
        onAppInfoClick,
        onCommentsClick,
        onFavoriteClick,
        baseDebugId,
        isExternal,
        isFavorite,
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);
    const classes = useStyles();
    return (
        <div>
            <IconButton
                id={build(baseDebugId, ids.DOT_MENU)}
                aria-label="More"
                aria-owns={open ? "long-menu" : null}
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                    id={build(baseDebugId, ids.APP_INFO)}
                    disabled={false}
                    className={classes.menuItem}
                    data-disabled={false}
                    onClick={() => {
                        onAppInfoClick();
                        handleClose();
                    }}
                >
                    <InfoIcon className={classes.toolbarItemColor} />
                    {getMessage("appInfo")}
                </MenuItem>
                {!isFavorite && !isExternal && (
                    <MenuItem
                        id={build(baseDebugId, ids.FAVORITES)}
                        disabled={false}
                        className={classes.menuItem}
                        data-disabled={false}
                        onClick={() => {
                            onFavoriteClick();
                            handleClose();
                        }}
                    >
                        <FavoriteIcon className={classes.toolbarItemColor} />
                        {getMessage("addToFavorites")}
                    </MenuItem>
                )}
                {isFavorite && !isExternal && (
                    <MenuItem
                        id={build(baseDebugId, ids.FAVORITES)}
                        disabled={false}
                        className={classes.menuItem}
                        data-disabled={false}
                        onClick={() => {
                            onFavoriteClick();
                            handleClose();
                        }}
                    >
                        <UnFavoriteIcon className={classes.toolbarItemColor} />
                        {getMessage("removeFromFavorites")}
                    </MenuItem>
                )}
                {!isExternal && (
                    <MenuItem
                        id={build(baseDebugId, ids.APP_COMMENTS)}
                        disabled={false}
                        className={classes.menuItem}
                        data-disabled={false}
                        onClick={() => {
                            onCommentsClick();
                            handleClose();
                        }}
                    >
                        <CommentsIcon className={classes.toolbarItemColor} />
                        {getMessage("comments")}
                    </MenuItem>
                )}
                {isExternal && [
                    <MenuItem
                        id={build(baseDebugId, ids.FAVORITES)}
                        disabled={false}
                        className={classes.menuItem}
                        data-disabled={false}
                        onClick={handleClose}
                    >
                        {getMessage("favoriteNotSupported")}
                    </MenuItem>,
                    <MenuItem
                        id={build(baseDebugId, ids.APP_COMMENTS)}
                        disabled={false}
                        className={classes.menuItem}
                        data-disabled={false}
                        onClick={handleClose}
                    >
                        {getMessage("commentsNotSupported")}
                    </MenuItem>,
                ]}
            </Menu>
        </div>
    );
}

export default withI18N(injectIntl(AppMenu), intlData);
