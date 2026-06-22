import React from "react";
import { ChelDetailView } from "./detail/ChelDetailView";
import { SpbDetailView } from "./detail/SpbDetailView";

interface DetailViewProps {
  currentDetail: { type: string; data: any };
  setViewMode: (mode: "list" | "detail") => void;
  setCurrentDetail: (detail: any) => void;
  setSelectedItem: (item: any) => void;
  fullGraph?: any;
  schemaAnalysis?: any[];
}

export const DetailView: React.FC<DetailViewProps> = (props) => {
  const city = props.currentDetail.data.city;

  if (city === 'chel') {
    return <ChelDetailView {...props} />;
  }

  return <SpbDetailView {...props} />;
};
