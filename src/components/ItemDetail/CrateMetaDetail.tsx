export const CrateMetaDetail = ({ meta }: { meta: any }) => {
  if (!meta) return null;

  return (
    <div className="text-sm text-gray-200 flex flex-col gap-1">
      <div>Type: {meta.Type}</div>
      <div>Name: {meta.Name}</div>
      <div>Amount: {meta.Amount}</div>
    </div>
  );
};
