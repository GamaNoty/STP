import { Loader2, Plus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestModal } from "../components/modals/TestModal";

type Test = {
  test_ID: number;
  name: string;
  date: string;
  subject_ID?: number;
  subject_name?: string;
  created_at?: string | number | Date;
};

export const Tests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTests = useCallback(async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/tests", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Nepodařilo se načíst testy");

      const data: Test[] = await response.json();
      setTests(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Neznámá chyba při načítání testů");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center text-brand-red">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-bold text-white tracking-wide">Testy</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20"
        >
          <Plus size={18} /> Vytvořit test
        </button>
      </div>

      {error && (
        <div className="text-amber-500 bg-amber-500/10 p-4 rounded-xl">{error}</div>
      )}

      <div className="mt-4 bg-[#1C1C24]/30 p-6 rounded-[24px] border border-white/5">
        <div className="grid grid-cols-5 gap-4 pb-4 border-b-2 border-brand-red text-brand-red font-bold text-sm tracking-wider uppercase px-4">
          <div className="col-span-1">Jméno testu</div>
          <div>Datum zadání</div>
          <div>Autor</div>
          <div>Skupina</div>
          <div className="text-right">Předmět/Termín</div>
        </div>

        <div className="flex flex-col">
          {tests.length > 0 ? (
            tests.map((test) => (
              <div
                key={test.test_ID}
                onClick={() => navigate(`/testy/${test.test_ID}`)}
                className="grid grid-cols-5 gap-4 py-6 px-4 items-center text-sm font-medium border-b border-white/5 cursor-pointer hover:bg-white/5 hover:scale-[1.01] transition-all duration-200 rounded-xl"
              >
                <div className="col-span-1 text-white text-base font-bold">
                  {test.name}
                </div>
                <div className="text-brand-textMuted">
                  {new Date(test.created_at || Date.now()).toLocaleDateString()}
                </div>
                <div className="text-brand-textMuted">Učitel</div>
                <div className="text-brand-textMuted">Třída</div>
                <div className="text-right flex flex-col">
                  <span className="text-white font-bold">
                    {test.subject_name || "Obecný"}
                  </span>
                  <span className="text-brand-red">{test.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-brand-textMuted">
              Zatím nebyly vytvořeny žádné testy.
            </div>
          )}
        </div>
      </div>
      <TestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTests}
      />
    </div>
  );
};
