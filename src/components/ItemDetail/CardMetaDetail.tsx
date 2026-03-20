export const WeaponMetadataDetail = ({ meta }: { meta: any }) => {
  if (!meta) return null;

  return (
    <div className="text-sm text-gray-200 flex flex-col gap-1">
      <div>OwnerName: {meta.OwnerName}</div>
      <div>BirthDate: {meta.BirthDate}</div>
      <div>IssuedOn: {meta.IssuedOn}</div>
      <div>IssuedBy: {meta.IssuedBy}</div>
      <div>Expire: {meta.Expire}</div>
      <div>Address: {meta.Address}</div>
    </div>
  );
};
