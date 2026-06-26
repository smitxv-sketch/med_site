/** Быстрая проверка с таймаутом — healthcheck Coolify/Docker ≤5s */
export async function withTimeout<T>(
  fn: () => Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      fn(),
      new Promise<T>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} timeout after ${ms}ms`)),
          ms,
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export type CheckStatus = 'connected' | 'failed' | 'timeout' | 'not_configured';

export async function runCheck(
  fn: () => Promise<unknown>,
  timeoutMs: number,
  label: string,
): Promise<CheckStatus> {
  try {
    await withTimeout(fn, timeoutMs, label);
    return 'connected';
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('timeout')) return 'timeout';
    return 'failed';
  }
}
