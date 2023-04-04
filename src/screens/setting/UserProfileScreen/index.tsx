import { ApolloError, useLazyQuery, useMutation } from '@apollo/client'
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCloudArrowUp,
  faDownload
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useAppNavigation } from 'libs/navigation'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { updateCategories } from 'libs/redux/categorySlice'
import { saveSetting } from 'libs/redux/settingSlice'
import { logout } from 'libs/redux/userSlice'
import {
  Box,
  MenuItem,
  NavigationBar,
  SCREEN_PADDING_HORIZONTAL,
  Text,
  showError,
  showSuccessToast,
  showToast
} from 'libs/ui'
import colors from 'libs/ui/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  DownloadUserData,
  DownloadUserDataVariables,
  GET_USER_DATA,
  UPDATE_USER,
  UpdateUserData,
  UpdateUserDataVariables
} from './graphql'

export const UserProfileScreen = () => {
  const { accountList, entryList, expenseCategories, incomeCategories } =
    useAppSelector(state => state.category)
  const { primaryCurrency, secondaryCurrency } = useAppSelector(
    state => state.setting
  )
  const { _id } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigation = useAppNavigation()

  const [uploadUserData] = useMutation<UpdateUserData, UpdateUserDataVariables>(
    UPDATE_USER,
    {
      onError: (error: ApolloError) => {
        console.log(error.networkError)
        showError(t('user_profile_screen.upload_error'))
      },
      onCompleted: () => {
        showSuccessToast(t('user_profile_screen.upload_success'))
      }
    }
  )

  const [downloadData] = useLazyQuery<
    DownloadUserData,
    DownloadUserDataVariables
  >(GET_USER_DATA, {
    onError: (error: ApolloError) => {
      console.log(error.networkError)
      showError(t('user_profile_screen.download_error'))
    },
    onCompleted: data => {
      dispatch(
        saveSetting({
          primaryCurrency: data.user.primaryCurrency,
          secondaryCurrency: !data.user.secondaryCurrency?.code
            ? null
            : data.user.secondaryCurrency
        })
      )
      dispatch(
        updateCategories({
          accountList: data.user.accountList,
          entryList: data.user.entryList,
          expenseCategories: data.user.expenseCategories,
          incomeCategories: data.user.incomeCategories
        })
      )
      showSuccessToast(t('user_profile_screen.download_success'))
    },
    variables: {
      userId: _id
    }
  })

  const handleUploadUserData = () => {
    uploadUserData({
      variables: {
        userId: _id,
        expenseCategories,
        incomeCategories,
        accountList,
        entryList,
        primaryCurrency,
        secondaryCurrency: secondaryCurrency || undefined
      }
    })
  }

  const handleLogout = () => {
    logout()
    showToast(t('user_profile_screen.logout_success'))
  }

  return (
    <>
      <NavigationBar title={t('setting_screen.user')} />
      <Box
        flex={1}
        backgroundColor={colors.white}
        paddingHorizontal={SCREEN_PADDING_HORIZONTAL}
        paddingTop={12}>
        {_id ? (
          <>
            <MenuItem
              icon={
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  size={16}
                  color={colors.primary100}
                />
              }
              marginBottom={8}
              label={
                <Box
                  flex={1}
                  flexDirection="row"
                  paddingRight={4}
                  justifyContent="space-between"
                  alignItems="center">
                  <Text lineHeight={22}>{t('user_profile_screen.upload')}</Text>
                </Box>
              }
              onPress={handleUploadUserData}
            />
            <MenuItem
              icon={
                <FontAwesomeIcon
                  icon={faDownload}
                  size={16}
                  color={colors.primary100}
                />
              }
              marginBottom={8}
              label={
                <Box
                  flex={1}
                  flexDirection="row"
                  paddingRight={4}
                  justifyContent="space-between"
                  alignItems="center">
                  <Text lineHeight={22}>
                    {t('user_profile_screen.download')}
                  </Text>
                </Box>
              }
              onPress={downloadData}
            />
            <MenuItem
              icon={
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size={16}
                  color={colors.destructive}
                />
              }
              marginBottom={8}
              label={
                <Box
                  flex={1}
                  flexDirection="row"
                  paddingRight={4}
                  justifyContent="space-between"
                  alignItems="center">
                  <Text lineHeight={22} color={colors.destructive}>
                    {t('user_profile_screen.logout')}
                  </Text>
                </Box>
              }
              onPress={handleLogout}
            />
          </>
        ) : (
          <MenuItem
            icon={
              <FontAwesomeIcon
                icon={faArrowRightToBracket}
                size={16}
                color={colors.primary100}
              />
            }
            marginBottom={8}
            label={
              <Box
                flex={1}
                flexDirection="row"
                paddingRight={4}
                justifyContent="space-between"
                alignItems="center">
                <Text lineHeight={22}>{t('user_profile_screen.login')}</Text>
              </Box>
            }
            onPress={() => navigation.navigate('LoginScreen')}
          />
        )}
      </Box>
    </>
  )
}
