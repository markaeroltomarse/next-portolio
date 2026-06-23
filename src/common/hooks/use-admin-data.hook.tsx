import { useCallback, useEffect, useState } from "react";

export default function useAdminData<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/content/${section}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .finally(() => setLoading(false));
  }, [section]);

  const save = useCallback(
    async (newData: T) => {
      setSaving(true);
      setSaved(false);
      try {
        const res = await fetch(`/api/content/${section}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        });
        const json = await res.json();
        if (json.success) {
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }
      } finally {
        setSaving(false);
      }
    },
    [section]
  );

  return { data, setData, loading, saving, saved, save };
}
