export const WeaponMetaDetail = ({ meta }: { meta: any }) => {
  if (!meta) return null;

  return (
    <div className="text-sm text-gray-200 flex flex-col gap-1">
      <div>Serial: {meta.SerialNumber}</div>
      <div>Ammo: {meta.AmmoCount}</div>
      <div>Type: {meta.WeaponType}</div>
      <div>Status: {meta.InUse ? "In Use" : "Stored"}</div>
    </div>
  );
};
