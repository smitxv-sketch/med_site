import { describe, it, expect, beforeEach } from 'vitest';
import { useUISettingsStore } from './src/shared/store/uiSettingsStore';

describe('Widget Matrix Architecture in CMS', () => {
  beforeEach(() => {
    // Сбрасываем стейт перед каждым тестом
    useUISettingsStore.setState({ pageBlocks: [] });
  });

  it('SHOULD allow dynamic addition of a new Widget with Intent and Layout props', () => {
    const store = useUISettingsStore.getState();
    const newBlock = {
      id: 'test-widget-1',
      type: 'CalculatorWidget' as any,
      props: {
        intent: 'educational',
        layoutPattern: 'grid'
      }
    };

    store.setPageBlocks([newBlock]);
    const updatedStore = useUISettingsStore.getState();

    expect(updatedStore.pageBlocks).toHaveLength(1);
    expect(updatedStore.pageBlocks[0].props.intent).toBe('educational');
    expect(updatedStore.pageBlocks[0].props.layoutPattern).toBe('grid');
  });

  it('SHOULD successfully override an existing widget property (Intent)', () => {
    const store = useUISettingsStore.getState();
    const newBlock = {
      id: 'test-widget-1',
      type: 'CalculatorWidget' as any,
      props: {
        intent: 'direct-response',
        layoutPattern: 'split'
      }
    };

    store.setPageBlocks([newBlock]);
    
    // Эмулируем апдейт аналогично PageBuilder
    const blocks = useUISettingsStore.getState().pageBlocks;
    const updatedBlocks = blocks.map(b => b.id === 'test-widget-1' ? { ...b, props: { ...b.props, intent: 'immersive' } } : b);
    store.setPageBlocks(updatedBlocks);

    const updatedStore = useUISettingsStore.getState();
    expect(updatedStore.pageBlocks[0].props.intent).toBe('immersive');
    expect(updatedStore.pageBlocks[0].props.layoutPattern).toBe('split');
  });
});
