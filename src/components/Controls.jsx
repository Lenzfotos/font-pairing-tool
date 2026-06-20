const STRATEGY_LABELS = {
  contrast: "Contrast",
  superfamily: "Superfamily",
  harmony: "Harmony",
  "mono-accent": "Mono-accent",
};

const PLATFORM_LABELS = {
  google: "Google Fonts",
  canva: "Canva",
  figma: "Figma",
  adobe: "Adobe",
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Filter UI. Stateless: it reads `filters` and emits the next filters object via
// onChange. App owns the state; Controls just describes the change.
export default function Controls({ filters, options, onChange, resultCount, savedCount }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  // Single-select: clicking the active value clears it back to "any" (null).
  const toggleSingle = (key, value) =>
    set({ [key]: filters[key] === value ? null : value });

  // Multi-select helper: add/remove a value from a list-valued filter key.
  const toggleMulti = (key, value) => {
    const have = filters[key] || [];
    const next = have.includes(value) ? have.filter((v) => v !== value) : [...have, value];
    set({ [key]: next });
  };

  const isDefault =
    !filters.useCase &&
    !filters.mood &&
    !filters.strategy &&
    !filters.savedOnly &&
    (filters.combos || []).length === 0 &&
    (filters.platforms || []).length === 0;

  return (
    <div className="controls">
      <label className={`saved-toggle ${filters.savedOnly ? "saved-toggle--on" : ""}`}>
        <input
          type="checkbox"
          checked={filters.savedOnly}
          disabled={savedCount === 0 && !filters.savedOnly}
          onChange={(e) => set({ savedOnly: e.target.checked })}
        />
        Saved only
        <span className="saved-toggle__count">{savedCount}</span>
      </label>

      <Group label="Use case">
        <div className="chips">
          {options.useCases.map((u) => (
            <Chip key={u} active={filters.useCase === u} onClick={() => toggleSingle("useCase", u)}>
              {cap(u)}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label="Mood">
        <div className="chips">
          {options.moods.map((m) => (
            <Chip key={m} active={filters.mood === m} onClick={() => toggleSingle("mood", m)}>
              {cap(m)}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label="Strategy">
        <div className="chips">
          {options.strategies.map((s) => (
            <Chip key={s} active={filters.strategy === s} onClick={() => toggleSingle("strategy", s)}>
              {STRATEGY_LABELS[s] || s}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label="Type combination">
        <div className="chips">
          {options.combos.map((c) => (
            <Chip
              key={c.key}
              active={(filters.combos || []).includes(c.key)}
              onClick={() => toggleMulti("combos", c.key)}
            >
              {c.label}
            </Chip>
          ))}
        </div>
      </Group>

      <Group label="Available on">
        <div className="chips">
          {options.platforms.map((p) => (
            <Chip key={p} active={(filters.platforms || []).includes(p)} onClick={() => toggleMulti("platforms", p)}>
              {PLATFORM_LABELS[p] || p}
            </Chip>
          ))}
        </div>
      </Group>

      <div className="controls__footer">
        <span className="controls__count">
          {resultCount} {resultCount === 1 ? "match" : "matches"}
        </span>
        <button
          className="controls__clear"
          onClick={() =>
            onChange({ useCase: null, mood: null, strategy: null, combos: [], platforms: [], savedOnly: false })
          }
          disabled={isDefault}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

function Group({ label, children }) {
  return (
    <fieldset className="control-group">
      <legend className="control-group__label">{label}</legend>
      {children}
    </fieldset>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={`chip ${active ? "chip--on" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
