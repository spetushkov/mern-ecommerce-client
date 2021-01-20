import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {
  endpoint: string;
  pageLimit: number;
  totalPages: number;
  currentPage: number;
};

export const Paginator = (props: Props): JSX.Element => {
  const { endpoint, pageLimit, totalPages, currentPage } = props;

  return (
    <Pagination>
      {[...Array(totalPages).keys()].map((page) => (
        <LinkContainer key={page + 1} to={`${endpoint}?pageLimit=${pageLimit}&page=${page + 1}`}>
          <Pagination.Item active={page + 1 === currentPage}>{page + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};
