import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  // replace with useQuery
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id)
  })
  if(isLoading) {
    return <h3>Loading...</h3>
  }
  if(isError) {
    return <>
      <h3>Oops, something is wrong.</h3>
      <p>{error.toString()}</p>
    </>
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post...</p>
        )}
        {deleteMutation.isError && (
          <p className="error">Error occured while deleting the post...</p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Deleting the post successed</p>
        )}
      </div>
      <div>
        <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
        {updateMutation.isPending && (
          <p className="loading">Updating the post...</p>
        )}
        {updateMutation.isError && (
          <p className="error">Error occured while updating the post...</p>
        )}
        {updateMutation.isSuccess && (
          <p className="success">Updating the post success</p>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
