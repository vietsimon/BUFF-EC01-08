import React from 'react';
import styles from './pagination.module.scss';
import usePagination from './usePagination';
import { usePaginationPropsType } from '../../type/PaginationType';
import classnames from 'classnames';
export interface Props {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount: number;
    currentPage: number;
    pageSize: number;
    className?: any;
}

export const PaginationComponent: React.FC<Props> = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    }) as any;

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        //disabled
        if (currentPage === lastPage) return;
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        //disabled
        if (currentPage === 1) return;
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className={classnames('box-pagination pagination-container', { [className]: className })} >
            <ul className='pagination' >
                {/* Left navigation arrow */}
                <li className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                    onClick={onPrevious}
                >
                    <a className="arrow left" >&lt;</a>
                </li>
                {paginationRange.map((pageNumber: any) => {

                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === 'DOTS') {
                        return <li className="pagination-item dots">&#8230;</li>;
                    }
                    // Render our Page Pills
                    return (
                        <li
                            className={classnames('pagination-item', {
                                active: pageNumber === currentPage
                            })}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            <span>{pageNumber}</span>
                        </li>
                    );
                })}
                {/*  Right Navigation arrow */}
                <li
                    className={classnames('pagination-item', {
                        disabled: currentPage === lastPage
                    })}
                    onClick={onNext} >
                    <a className="arrow right" >&gt;</a>
                </li>
            </ul>
        </div >
    );
};

export const Pagination = PaginationComponent;

