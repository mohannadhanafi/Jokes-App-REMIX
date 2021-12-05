import { LoaderFunction, useLoaderData, Link } from "remix";
import type { Joke } from "@prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({ where: { id: params.jokeId } });
  if (joke) {
    return joke;
  } else throw new Error("Joke not found");
};

const JokeRoute = () => {
  const data = useLoaderData<LoaderData>();
  console.log({data})
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.content}</p>
      <Link to=".">{data.name} Permalink</Link>
    </div>
  );
};

export default JokeRoute;
