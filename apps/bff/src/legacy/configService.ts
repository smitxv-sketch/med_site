import branches from '../../config/branches.json' with { type: 'json' };
import infrastructure from '../../config/infrastructure.json' with { type: 'json' };
import logic from '../../config/logic.json' with { type: 'json' };
import tenants from '../../config/tenants.json' with { type: 'json' };
import text from '../../config/text.json' with { type: 'json' };
import theme from '../../config/legacy/theme.json' with { type: 'json' };
import topology from '../../config/topology.json' with { type: 'json' };

const configs: Record<string, unknown> = {
  branches,
  infrastructure,
  logic,
  tenants,
  text,
  theme,
  topology,
};

export const loadConfig = (name: string) => {
  return configs[name] || {};
};
