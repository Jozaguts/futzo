type Header = {
  title: string;
  value: string;
  sortable: boolean;
  align?: string;
};

export default function getHeaders(tableName: string): Header[] {
  switch (tableName) {
    case "teams":
      return [
        { title: "#", value: "index", sortable: true },
        { title: "Equipo", value: "name", sortable: true },
        { title: "Torneo", value: "tournament.name", sortable: true },
        { title: "Categoría", value: "category.name", sortable: true },
        { title: "Cancha", value: "field", sortable: true },
        {
          title: "Delegado/Presidente",
          value: "president.name",
          sortable: true,
        },
        {
          title: "Teléfono",
          value: "president.phone",
          sortable: true,
          align: "center",
        },
        {
          title: "Correo",
          value: "president.email",
          sortable: true,
          align: "center",
        },
        {
          title: "Dirección",
          value: "address.structured_formatting.main_text",
          sortable: true,
          align: "center",
        },
        { title: "", value: "actions", sortable: false },
      ];
    case "tournaments":
      return [
        { title: "Nombre del torneo", value: "name", sortable: true },
        { title: "Categoría", value: "category.name", sortable: true },
        { title: "Formato", value: "format.name", sortable: true },
        { title: "Inicio", value: "start_date", sortable: true },
        { title: "Fin", value: "end_date", sortable: true },
        {
          title: "# de equipos",
          value: "teams",
          sortable: true,
          align: "center",
        },
        {
          title: "# de partidos",
          value: "matches",
          sortable: true,
          align: "center",
        },
        {
          title: "# de jugadores",
          value: "players",
          sortable: true,
          align: "center",
        },
        { title: "Status", value: "status", sortable: true, align: "center" },
        { title: "", value: "actions", sortable: false },
      ];
    default:
      throw new Error("Table not found");
  }
}
