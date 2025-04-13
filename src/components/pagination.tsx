import { ReactElement, useMemo } from 'react';

import arrayRange from '@/helpers/array-range';

import { Last, Next } from './icons';

type ButtonProps = {
  disabled?: boolean;
  focus?: boolean;
  onClick: () => void;
  children: ReactElement;
};

const Button = ({ disabled, focus, onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={`${disabled ? 'cursor-default' : focus ? 'bg-green-700 cursor-pointer' : 'cursor-pointer hover:bg-green-600'} group relative flex size-6 items-center justify-center rounded-full duration-200 ease-in-out md:size-10`}
    >
      {children}
    </button>
  );
};

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  changePage: (page: number) => void;
  className?: string;
};

const Pagination = ({
  currentPage,
  pageCount,
  className,
  changePage,
}: PaginationProps) => {
  const pageRange = useMemo(() => {
    if (currentPage === 1 || currentPage === 2) {
      return pageCount < 5 ? arrayRange(1, pageCount, 1) : arrayRange(1, 5, 1);
    }
    if (currentPage === pageCount - 1 || currentPage === pageCount) {
      return pageCount > 5
        ? arrayRange(pageCount - 4, pageCount, 1)
        : arrayRange(1, pageCount, 1);
    }
    return arrayRange(currentPage - 2, currentPage + 2, 1);
  }, [currentPage, pageCount]);

  const next = () => {
    if (currentPage >= pageCount) return;
    changePage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage <= 1) return;
    changePage(currentPage - 1);
  };

  const first = () => {
    if (currentPage === 1) return;
    changePage(1);
  };

  const last = () => {
    if (currentPage === pageCount) return;
    changePage(pageCount);
  };

  return (
    <div
      className={`${className} relative mt-5 flex flex-row gap-2 text-black`}
    >
      <Button disabled={currentPage <= 1} onClick={first} focus={false}>
        <Last
          className={`${currentPage <= 1 ? 'fill-gray-500' : 'fill-black'} relative size-4 rotate-180 fill-black md:size-6`}
        />
      </Button>
      <Button disabled={currentPage <= 1} onClick={prev} focus={false}>
        <Next
          className={`${currentPage <= 1 ? 'fill-gray-500' : 'fill-black'} relative size-4 rotate-90 md:size-6`}
        />
      </Button>
      {pageRange.map((page) => {
        return (
          <Button
            key={page}
            onClick={() => {
              changePage(page);
            }}
            focus={currentPage === page}
          >
            <div
              className={`${currentPage === page ? 'font-bold text-white' : ''}`}
            >
              {page}
            </div>
          </Button>
        );
      })}
      <Button disabled={currentPage >= pageCount} onClick={next} focus={false}>
        <Next
          className={`${currentPage >= pageCount ? 'fill-gray-500' : 'fill-black'} relative size-4 -rotate-90 md:size-6`}
        />
      </Button>
      <Button disabled={currentPage >= pageCount} onClick={last} focus={false}>
        <Last
          className={`${currentPage >= pageCount ? 'fill-gray-500' : 'fill-black'} relative size-4 md:size-6`}
        />
      </Button>
    </div>
  );
};

export default Pagination;
