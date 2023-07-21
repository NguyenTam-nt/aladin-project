import React, {memo, useCallback, useEffect, useState} from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';
import {defaultColors} from '@configs';
import {Days, months} from '@constants';
import {ICArrowLeft} from 'src/assets/icons/ICArrowLeft';
import {ICArrowRight} from 'src/assets/icons/ICArrowRight';
import {TextCustom} from '@components';
import {globalStyles} from 'src/commons/globalStyles';

export interface IDate {
  day: string
  month: string
  year: string
  weekday?: string
}

const date = new Date();
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const Calendar =  memo(() => {
  const [dateEvent, setDateEvent] = useState<string | null>();
  const [targetDateStart, setTargetStart] = useState<IDate>();
  const [targetDateEnd, setTargetEnd] = useState<IDate>();
  const [datePicker, setDatePicker] = useState<IDate>({
    day: `00${date.getDate()}`.slice(-2),
    month: `00${date.getMonth() + 1}`.slice(-2),
    year: `${date.getFullYear()}`,
    weekday: 'Hôm nay',
  });

  // list day current month
  const [arrDays, setArrdays] = useState<IDate[]>([]);

  // handle show, hide droplist year and month

  // render when mount dashboard in Dom

  const renderCalender = useCallback((year: string, month: string) => {
    // pre month
    const preMonthday = new Date(
      +month === 1 ? +year - 1 : +year,
      +month === 1 ? 12 : +month - 1,
      0,
    );
    const preMonth = preMonthday.getDate();

    // current month
    const currentMonth = new Date(+year, +month, 0);

    const lastDate = currentMonth.getDate();
    currentMonth.setDate(1);

    const offsetPreDays = currentMonth.getDay();

    // next month
    const nextMonth = new Date(+year, +month + 1, 0);
    const nextDays = nextMonth.getDate();

    const newArr: IDate[] = [];

    for (let i = (offsetPreDays === 0 ? 7 : offsetPreDays) - 1; i > 0; i--) {
      preMonthday.setDate(preMonth - i + 1);

      newArr.push({
        day: `00${preMonth - i + 1}`.slice(-2),
        month: `00${+month === 1 ? 12 : +month - 1}`.slice(-2),
        year: `${+month === 1 ? +year - 1 : +year}`,
        weekday: hanldeDay(preMonthday.getDay()),
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      currentMonth.setDate(i);

      newArr.push({
        day: `00${i}`.slice(-2),
        month: `00${month}`.slice(-2),
        year,
        weekday: hanldeDay(currentMonth.getDay()),
      });
    }

    for (let i = 1; i <= nextDays; i++) {
      nextMonth.setDate(i);

      newArr.push({
        day: `00${i}`.slice(-2),
        month: `00${+month === 12 ? 1 : +month + 1}`.slice(-2),
        year: `${+month === 12 ? +year + 1 : +year}`,
        weekday: hanldeDay(nextMonth.getDay()),
      });
    }
    setArrdays(newArr.slice(0, 42));
  }, []);

  useEffect(() => {
    renderCalender(datePicker.year, datePicker.month);
    return () => {
      cancelRequest();
    };
  }, [datePicker, renderCalender]);

  const cancelRequest = () => {
    const cancel = new AbortController();
    cancel.abort();
  };

  // sử lý lấy thứ
  const hanldeDay = (day: number) => {
    return Days[day === 0 ? 7 - 1 : day - 1];
  };

  // lắng nghe sự kiện thay đổi tháng
  const changeMonth = useCallback(
    (month: number) => {
      let monthActive: number, year: number;
      if (month === -1) {
        year =
          +datePicker.month + month > 0
            ? +datePicker.year
            : +datePicker.year - 1;
        monthActive =
          +datePicker.month + month > 0 ? +datePicker.month + month : 12;
      } else {
        year =
          +datePicker.month + month <= 12
            ? +datePicker.year
            : +datePicker.year + 1;
        monthActive =
          +datePicker.month + month <= 12 ? +datePicker.month + month : 1;
      }

      renderCalender(year.toString(), monthActive.toString());

      const dateForMonth = new Date(year, monthActive, 0);
      dateForMonth.setDate(+datePicker.day);

      setDatePicker(currentDate => {
        return {
          ...currentDate,
          year: year + '',
          month: `00${monthActive}`.slice(-2),
          weekday: hanldeDay(dateForMonth.getDay()),
        };
      });
    },
    [datePicker],
  );

  // active when click to a day
  const activeDay = useCallback(
    (dateItem: IDate) => {
      // let note = listNoteid.find((notes) => notes.noteDate === `${date.year}-${date.month}-${date.day}`)
      // const dateString = `${dateItem.year}-${dateItem.month}-${dateItem.day}`;
      // setDateEventClick(dateString)
      // setNoteToEvent(note?.id || null)

      // unRender when change month
      if (dateItem.month !== datePicker.month) {
        renderCalender(dateItem.year, dateItem.month);
      }

      setDatePicker(currentDate => {
        return {
          ...currentDate,
          day: dateItem.day,
          month: dateItem.month,
          year: dateItem.year,
          weekday: dateItem.weekday,
        };
      });
    },
    [renderCalender],
  );
  const handleClickDay = useCallback(
    (dateDay: IDate) => {
      const currentTime = `${dateDay.year}${dateDay.month}${dateDay.day}`;
      const targetDateStartTime = targetDateStart
        ? `${targetDateStart.year}${targetDateStart.month}${targetDateStart.day}`
        : 0;
      const targetDateEndTime = targetDateEnd
        ? `${targetDateEnd.year}${targetDateEnd.month}${targetDateEnd.day}`
        : 0;
      if (targetDateStart && currentTime === targetDateStartTime) {
        if (targetDateEnd) {
          setTargetStart(targetDateEnd);
          setTargetEnd(undefined);
        } else {
          setTargetStart(undefined);
        }
        return;
      }

      if (targetDateEnd && currentTime === targetDateEndTime) {
        setTargetEnd(undefined);
        return;
      }

      if (!targetDateStart) {
        if (targetDateEnd) {
          if (currentTime < targetDateEndTime) {
            setTargetStart(dateDay);
          } else {
            setTargetEnd(dateDay);
            setTargetStart(targetDateEnd);
          }
        } else {
          setTargetStart(dateDay);
        }
        return;
      }

      if (!targetDateEnd) {
        if (currentTime > targetDateStartTime) {
          setTargetEnd(dateDay);
        } else {
          setTargetStart(dateDay);
          setTargetEnd(targetDateStart);
        }
        return;
      }

      if (currentTime > targetDateStartTime) {
        setTargetEnd(dateDay);
        return;
      }

      if (currentTime < targetDateStartTime) {
        setTargetStart(dateDay);
        return;
      }
    },
    [targetDateStart, targetDateEnd],
  );

  return (
    <>
      <View style={styles.container}>
        <View
          style={styles.group}>
          <View
            style={styles.group_date}>
            <Pressable onPress={() => changeMonth(-1)}>
              <ICArrowLeft
                width={16}
                height={16}
                color={defaultColors.bg_848A95}
              />
            </Pressable>
            <TextCustom weight="500">
              {months[Number(datePicker.month) - 1]} {datePicker.year}
            </TextCustom>
            <Pressable onPress={() => changeMonth(1)}>
              <ICArrowRight
                width={16}
                height={16}
                color={defaultColors.bg_848A95}
              />
            </Pressable>
          </View>
          <View
            style={styles.group_day}>
            {days.map((item, index) => {
              return (
                <View
                 key={index}
                  style={styles.styleBoxDay}>
                  <TextCustom
                    key={index}
                    textAlign="center"
                    color={defaultColors.bg_7E818C}
                    fontSize={10}
                    weight="500">
                    {item}
                  </TextCustom>
                </View>
              );
            })}
          </View>

          <View
            style={styles.styleListday}>
            {arrDays.map((dateItem, index) => {
              const currentTime = `${dateItem.year}${dateItem.month}${dateItem.day}`;
              const targetDateStartTime = targetDateStart
                ? `${targetDateStart.year}${targetDateStart.month}${targetDateStart.day}`
                : 0;
              const targetDateEndTime = targetDateEnd
                ? `${targetDateEnd.year}${targetDateEnd.month}${targetDateEnd.day}`
                : 0;

              const isActive =
                (targetDateStart?.day === dateItem.day &&
                  +targetDateStart?.month === +dateItem.month &&
                  targetDateStart?.year === dateItem.year) ||
                (targetDateEnd?.day === dateItem.day &&
                  targetDateEnd?.month === dateItem.month &&
                  targetDateEnd?.year === dateItem.year);

              const isUnActive = +datePicker.month !== +dateItem.month;

              return (
                <Pressable
                  style={[
                    styles.styleBtn,
                    +dateItem.day === new Date().getDate() &&
                    +dateItem.month === new Date().getMonth() + 1 &&
                    +dateItem.year === new Date().getFullYear()
                      ? styles.currentDay
                      : undefined,
                    isActive ? styles.active : undefined,
                    targetDateStart &&
                    targetDateEnd &&
                    +currentTime > +targetDateStartTime &&
                    +currentTime < +targetDateEndTime
                      ? styles.styleInclude
                      : undefined,
                  ]}
                  onPress={() => {
                    handleClickDay(dateItem);
                  }}
                  key={index}>
                  <Text
                    style={[
                      {
                        color: isActive
                          ? defaultColors.c_fff
                          : !isUnActive
                          ? defaultColors.c_222124
                          : defaultColors.rgba_0_0_0_03,
                      },
                      styles.styleText,
                    ]}>
                    {dateItem.day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
})

const styles = StyleSheet.create({
  container: {
    width: 308,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 16,
  },
  group: {
    borderWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    borderRadius: 8,
    padding: 24,
  },
  group_date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  group_day: {
    flexDirection: 'row',
    columnGap: 8,
  },
  currentDay: {
    borderWidth: 1,
    borderColor: defaultColors._EA222A,
  },
  active: {
    backgroundColor: defaultColors._EA222A,
    color: defaultColors.c_fff,
  },
  styleBtn: {
    ...globalStyles.center,
    ...globalStyles.justifyContentCenter,
    width: 30,
    height: 30,
    borderRadius: 15,
    color: defaultColors.c_222124,
    overflow: 'hidden',
    position: 'relative',
  },
  styleInclude: {
    backgroundColor: defaultColors.bg_FCEAEA,
  },
  unActive: {
    color: defaultColors.rgba_0_0_0_03,
    // backgroundColor: defaultColors.bg_FCEAEA
  },
  styleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  styleBoxDay: {
    width: 30
  },
  styleListday: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 8,
    marginTop: 16,
  }
});
