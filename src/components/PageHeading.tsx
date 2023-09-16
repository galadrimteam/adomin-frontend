interface Props {
  text: string;
}

export const PageHeading = ({ text }: Props) => {
  return (
    <div className="my-4 flex justify-center">
      <h1 className="text-2xl text-center font-bold p-4 rounded-md border-solid border-si  ">
        {text}
      </h1>
    </div>
  );
};
