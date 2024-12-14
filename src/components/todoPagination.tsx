import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

function TodoPagination({
  postsPerPage,
  totalPosts,
  paginate,
}: {
  postsPerPage: number;
  totalPosts: number;
  paginate: (page: number) => void;
}) {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pt-4">
      <Pagination>
        <PaginationContent className="flex">
          {pageNumbers.length === 0 && (
            <PaginationItem className="cursor-pointer bg-accent/20">
              <PaginationLink>0</PaginationLink>
            </PaginationItem>
          )}
          {pageNumbers.map((page) => (
            <PaginationItem key={page} className="cursor-pointer bg-accent/20">
              <PaginationLink onClick={() => paginate(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default TodoPagination;
