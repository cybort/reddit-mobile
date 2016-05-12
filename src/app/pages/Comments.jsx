import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import CommentsList from 'app/components/CommentsList';
import Post from 'app/components/Post';
import Loading from 'app/components/Loading';

import CommentsPageHandler from 'app/router/handlers/CommentsPage';
import { paramsToCommentsPageId } from 'app/models/CommentsPage';

const commentsPageSelector = createSelector(
  (state, props) => props,
  (state, /*props*/) => state.commentsPages,
  (state, /*props*/) => state.comments,
  (pageProps, commentsPages/*, commentsStore*/) => {
    const commentsPageParams = CommentsPageHandler.PageParamsToCommentsPageParams(pageProps);
    const commentsPageId = paramsToCommentsPageId(commentsPageParams);
    const commentsPage = commentsPages[commentsPageId];
    const topLevelComments = (!commentsPage || commentsPage.loading)
      ? []
      : commentsPage.results;

    const permalinkBase = pageProps.url;

    return {
      commentsPageParams,
      commentsPage,
      commentsPageId,
      permalinkBase,
      topLevelComments,
    };
  },
);

export const CommentsPage = connect(commentsPageSelector)((props) => {
  const { commentsPage, commentsPageParams, topLevelComments, permalinkBase } = props;

  return (
    <div className='CommentsPage BelowTopNav'>
      <Post postId={ commentsPageParams.id } single={ true } />
      { !commentsPage || commentsPage.loading ?
        <Loading /> :
        <CommentsList
          commentRecords={ topLevelComments }
          permalinkBase={ permalinkBase }
          className={ 'CommentsList__topLevel' }
        /> }
    </div>
  );
});
