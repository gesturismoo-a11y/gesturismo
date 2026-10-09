(function (root, factory) {
  const schedule = factory();
  if (typeof module === "object" && module.exports) module.exports = schedule;
  if (root) root.GESS_TRAVEL_SCHEDULE = schedule;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const departures = Object.freeze({
    arraial: [
      { start: "2026-12-19", end: "2026-12-20" },
      { start: "2027-01-30", end: "2027-01-31" }
    ],
    campos: [
      { start: "2026-11-07", end: "2026-11-07" },
      { start: "2027-01-23", end: "2027-01-23" }
    ],
    guaruja: [
      { start: "2026-10-17", end: "2026-10-18" },
      { start: "2027-01-09", end: "2027-01-10" }
    ],
    bertioga: [
      { start: "2026-10-31", end: "2026-11-01" },
      { start: "2027-01-09", end: "2027-01-10" }
    ],
    buzios: [
      { start: "2026-11-14", end: "2026-11-15" },
      { start: "2027-01-23", end: "2027-01-24" }
    ],
    cananeia: [
      { start: "2026-11-21", end: "2026-11-22" },
      { start: "2027-01-16", end: "2027-01-17" }
    ],
    capitolio: [
      { start: "2026-11-28", end: "2026-11-29" },
      { start: "2027-01-16", end: "2027-01-17" }
    ],
    ilhabela: [
      { start: "2026-10-25", end: "2026-10-25" },
      { start: "2027-01-17", end: "2027-01-17" }
    ],
    angra: [
      { start: "2026-12-05", end: "2026-12-06" },
      { start: "2027-01-23", end: "2027-01-24" }
    ],
    paraty: [
      { start: "2026-10-24", end: "2026-10-24" },
      { start: "2027-01-16", end: "2027-01-16" }
    ],
    hopi: [
      { start: "2026-11-08", end: "2026-11-08" }
    ],
    copacabana: [
      { start: "2026-12-12", end: "2026-12-12" },
      { start: "2027-01-24", end: "2027-01-24" }
    ]
  });

  function saoPauloDateKey(date = new Date()) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date).reduce((result, part) => {
      if (part.type !== "literal") result[part.type] = part.value;
      return result;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}`;
  }

  function available(destinationKey, today = saoPauloDateKey()) {
    return (departures[destinationKey] || []).filter(departure => departure.end >= today);
  }

  function isBookable(destinationKey, start, today = saoPauloDateKey()) {
    return available(destinationKey, today).some(departure => departure.start === start);
  }

  return Object.freeze({ departures, saoPauloDateKey, available, isBookable });
});
