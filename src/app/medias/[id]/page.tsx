type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id: mediaId } }: Props) {
  return <h1>hello world: {mediaId}</h1>;
}
