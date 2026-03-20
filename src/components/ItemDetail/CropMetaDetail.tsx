export const CropMetaDetail = ({ meta }: { meta: any }) => {
  if (!meta) return null;

  return (
    <div className="text-sm text-gray-200 flex flex-col gap-1">
      <div>CropNames: {meta.CropNames}</div>
      <div>CropType: {meta.CropType}</div>
    </div>
  );
};
