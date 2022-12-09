import {
  BottomSheetBackdrop,
  BottomSheetModal as BaseBottomSheet,
  BottomSheetProps as BaseBottomSheetProps,
  useBottomSheet as useBaseBottomSheet
} from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods as BaseBottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { StyleSheet } from 'react-native'
import colors from '../colors'
import { getHeight, getWidth } from 'libs/utils'

type Props = BaseBottomSheetProps & {}

export type BottomSheetMethods = BaseBottomSheetMethods | null

const _BottomSheet: React.ForwardRefRenderFunction<
  BottomSheetMethods,
  Props
> = ({ children, ...props }, forwardRef) => {
  const bottomSheetRef = useRef<BaseBottomSheet>(null)

  useImperativeHandle<BottomSheetMethods, BottomSheetMethods>(
    forwardRef,
    () => bottomSheetRef.current
  )

  return (
    <BaseBottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      handleIndicatorStyle={styles.handle}
      backdropComponent={backdropProps => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior={'close'}
          opacity={0.4}
          style={styles.backdrop}
        />
      )}
      {...props}>
      {children}
    </BaseBottomSheet>
  )
}
export const BottomSheet = forwardRef(_BottomSheet)

export const useBottomSheet = () => {
  return useBaseBottomSheet()
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.mono100,
    height: getHeight(100),
    width: getWidth(100),
    position: 'absolute',
    top: 0
  },
  handle: {
    backgroundColor: colors.aliceBlue,
    width: 60,
    height: 4,
    borderRadius: 2
  }
})
