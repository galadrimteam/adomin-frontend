export const Models = ({ models }: { models: string[] }) => {
  return (
    <ul>
      {models.map((model) => (
        <a key={model} href={`/adomin/${model}`}>
          <li>{model}</li>
        </a>
      ))}
    </ul>
  );
};
