import { pageCount } from "../pageUtils";

export const Pagination = ({ itemsPerPage, totalItems, currentPageIndex, onPageClick }) =>
    <>
        {
            totalItems > itemsPerPage &&
            <ul>
                {
                    Array.from({ length: pageCount(itemsPerPage, totalItems) }).map((_, pageIndex) =>
                        <li key={pageIndex}
                            onClick={() => onPageClick(pageIndex)}
                            className={pageIndex === currentPageIndex ? 'selected' : ''}>{pageIndex + 1}</li>
                    )
                }
            </ul>}
    </>;
