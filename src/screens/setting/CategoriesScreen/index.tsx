import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Box, NavigationBar, Pressable, TabBar } from 'libs/ui'
import colors from 'libs/ui/colors'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SceneMap, TabView } from 'react-native-tab-view'
import { CategoriesList, editModeTogglenotifier } from 'src/components'

const ExpensesTab = () => <CategoriesList type="expenses" />
const IncomesTab = () => <CategoriesList type="incomes" />

const renderScene = SceneMap({
  expenses: ExpensesTab,
  incomes: IncomesTab
})

export const CategoriesScreen = () => {
  const { t } = useTranslation()

  const [index, setIndex] = useState<number>(0)
  const routes = useMemo(() => {
    return [
      {
        key: 'expenses',
        title: t('categories_screen.expenses')
      },
      {
        key: 'incomes',
        title: t('categories_screen.incomes')
      }
    ]
  }, [t])

  const handleToggleEditMode = () => {
    editModeTogglenotifier.notify()
  }

  return (
    <>
      <NavigationBar
        transparent
        title={t('setting_screen.categories')}
        right={
          <Pressable onPress={handleToggleEditMode}>
            <FontAwesomeIcon icon={faPen} size={14} color={colors.mono100} />
          </Pressable>
        }
      />
      <Box flex={1}>
        <TabView
          lazy
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderTabBar={props => <TabBar {...props} setIndex={setIndex} />}
        />
      </Box>
    </>
  )
}
