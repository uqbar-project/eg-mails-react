import { useEffect } from 'react'

export const useOnInit = (initialCallBack: () => void) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs only on mount
  useEffect(() => {
    initialCallBack()
  }, [])
}
