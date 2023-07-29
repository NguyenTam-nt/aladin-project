import {View, StyleSheet, Platform, FlatList, Share, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import {defaultColors} from '@configs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import {TextCustom} from '@components';
import XLSX from 'xlsx';
import {GroupAction} from './GroupAction';
import {handleSelectResourses} from 'src/commons/permissionUtil';
import {isIOS} from '@constants';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import { getValueForDevice } from 'src/commons/formatMoney'
const {
  dirs: {DownloadDir, DocumentDir},
} = RNFetchBlob.fs;

const titles = ['Mã món ăn', 'Món ăn', 'Số lượng bán', 'Số lượng hủy'];
const data = [
  {
    code: 'Lau01',
    name: 'Lẩu',
    quantity: 430,
    quantity_cancel: 230,
    items: [
      {
        code: 'MA1',
        name: 'Lẩu nướng',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA2',
        name: 'Lẩu 1 ngăn',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA3',
        name: 'Lẩu 2 ngăn',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA4',
        name: 'Lẩu 4 ngăng',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA5',
        name: 'Món lẻ',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA1',
        name: 'Lẩu nướng',
        quantity: 50,
        quantity_cancel: 60,
      },
    ],
  },
  {
    code: 'Lau01',
    name: 'Lẩu',
    quantity: 430,
    quantity_cancel: 230,
    items: [
      {
        code: 'MA1',
        name: 'Lẩu nướng',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA2',
        name: 'Lẩu 1 ngăn',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA3',
        name: 'Lẩu 2 ngăn',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA4',
        name: 'Lẩu 4 ngăng',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA5',
        name: 'Món lẻ',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA1',
        name: 'Lẩu nướng',
        quantity: 50,
        quantity_cancel: 60,
      },
    ],
  },
  {
    code: 'Lau01',
    name: 'Lẩu',
    quantity: 430,
    quantity_cancel: 230,
    items: [
      {
        code: 'MA1',
        name: 'Lẩu nướng',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA2',
        name: 'Lẩu 1 ngăn',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA3',
        name: 'Lẩu 2 ngăn',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA4',
        name: 'Lẩu 4 ngăng',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA5',
        name: 'Món lẻ',
        quantity: 50,
        quantity_cancel: 60,
      },
      {
        code: 'MA1',
        name: 'Lẩu nướng',
        quantity: 50,
        quantity_cancel: 60,
      },
    ],
  },
];

export enum FileType {
  pdf = 'PDF',
  excel = 'EXCEL',
}

type Props = {
  setIsOpenTab: React.Dispatch<React.SetStateAction<boolean>>
};

export const MainDetail = ({setIsOpenTab}: Props) => {
  const downloadPdf = async () => {
    const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});

    const html = `
    <html>
      <head>
        <style>
        .container {
            width: 100%;
        }
          body {
            font-family: 'Times New Roman';
            font-size: 12px;
          }
          .header-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .header-tr {
            background-color: #EA222A;
            color: #fff;
          }
          header, footer {
            height: 50px;
            background-color: #fff;
            color: #000;
            display: flex;
            justify-content: center;
            padding: 0 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border-width: 1px;
            border-style: solid;
            border-color: transparent transparent #ccc transparent;
            padding: 5px;
          }
          th {
            background-color: #ccc;
          }
          .font-bold {
            font-weight: bold;
          }
          p {
            font-size: 12px
          }
          h2 {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            margin-top: 40px;
            text-transform: uppercase;
          }
          .sub-title {
            font-size: 14px;
            text-align: center;
            margin-top: 16px
          }

          .header {
            display: flex;
            align-items: center;
            grid-column-gap: 25px;
            font-size: 14
          }
          table {
            margin-top: 16px;
          }
          .flex {
            display: flex;
            align-items: center;
          }
        </style>
      </head>
      <body>
          <div class="container">
          <div class="header-info">
          <div class="header">
            <p class="flex">
            <span class="font-bold">Ngày lập: </span> <span>15/06/2023 - 15:00</span>
            </p>
            <p class="flex">
            <span class="font-bold">Người lập: </span> <span>Admin</span>
            </p>
        </div>
          <p class="flex">
            <span class="font-bold">Cơ sở: </span>
            <span>102 Trường Trinh, Phường Mai, Đống Đa, Hà Nội</span>
             </p>
          </div>
          <h2>Báo cáo món ăn Bán - Hủy</h2>
          <p class="sub-title">
          <span class=" font-bold">Ngày: </span>
          <span>Từ 29/06/2023 đến 29/07/2023</span>
        </p>
      <table>
        <tr class="header-tr">
        ${titles
          .map(item => {
            return ` <td>${item}</td>`;
          })
          .join('')} 
        </tr>
        ${data
          .map(
            line => `
          <tr style="background-color: rgba(248, 213, 213, 1)">
            <td>${line.code}</td>
            <td>${line.name}</td>
            <td style="margin-left: 40px">${line.quantity}</td>
            <td style="margin-left: 40px">${line.quantity_cancel}</td>
          </tr>
          ${line.items
            .map(
              item => `
                <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td style="margin-left: 40px">${item.quantity}</td>
                <td style="margin-left: 40px">${item.quantity_cancel}</td>
              </tr>
            `,
            )
            .join('')}
        `,
          )
          .join('')}
      </table>
          </div>
        
      </body>
    </html>
  `;

    let options = {
      html: html,
      fileName: 'doanh-thu5',
      directory: aPath + '/' + 'test.pdf',
    };

    await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert('Tải file thành công');
  };

  const exportExcelFIle = () => {
    let wb = XLSX.utils.book_new();
    let sample_data_to_export = [
      {id: '1', name: 'First User'},
      {id: '2', name: 'Second User'},
    ];
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary'});
    // const blob = new Blob([wbout], {
    //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   });

    const aPath = Platform.select({
      ios: RNFetchBlob.fs.dirs.LibraryDir,
      android: DownloadDir,
    });

    RNFetchBlob.fs
      .writeFile(aPath + '/bao-cao123.xlsx', wbout, 'base64')
      .then(() => {
        // Share.share(aPath + '/bao-cao123.xlsx')
        alert('Tải file thành công');
      });
  };

  const handleDownload = useCallback((type: FileType) => {
    switch (type) {
      case FileType.pdf:
        if (isIOS) {
          downloadPdf();
          return;
        }
        // downloadPdf()
        handleSelectResourses.handleSelectFiles(downloadPdf);
        break;
      case FileType.excel:
        exportExcelFIle();
        break;
      default:
        break;
    }
  }, []);

  return (
    <View style={globalStyles.fullFill}>
      <ButtonMenuTabBar onPress={setIsOpenTab} />
      <View style={styles.container}>
        <GroupAction onDownload={handleDownload} />
        <View style={styles.content}>
          <FlatList
          showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <View
                  style={[
                    globalStyles.row,
                    globalStyles.justifyContentBetween,
                    styles.colGap_50
                  ]}>
                  <View style={[globalStyles.row, styles.styleGap25]}>
                    <View style={globalStyles.row}>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={14}
                        weight="700">
                        Ngày lập:{' '}
                      </TextCustom>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={14}
                        weight="400">
                        {' '}
                        15/06/2023 - 15:00
                      </TextCustom>
                    </View>
                    <View style={globalStyles.row}>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={14}
                        weight="700">
                        Người lập lập:{' '}
                      </TextCustom>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={14}
                        weight="400">
                        {' '}
                        Admin
                      </TextCustom>
                    </View>
                  </View>
                  <View style={globalStyles.row}>
                    <TextCustom
                      color={defaultColors.c_0000}
                      fontSize={14}
                      weight="700">
                      Cơ sở:
                    </TextCustom>
                    <TextCustom
                      color={defaultColors.c_0000}
                      fontSize={14}
                      weight="400">
                      {' '}
                      102 Trường Trinh, Phương Mai, Đống Đa, Hà Nội
                    </TextCustom>
                  </View>
                  {/* </View> */}
                </View>
                <View style={styles.mt_40}>
                  <TextCustom
                    fontSize={32}
                    weight="700"
                    color={defaultColors.c_0000}
                    textAlign="center"
                    textTransform="uppercase">
                    Báo cáo món ăn Bán - Hủy
                  </TextCustom>
                  <View
                    style={[
                      globalStyles.row,
                      globalStyles.justifyContentCenter,
                      {marginTop: 16},
                    ]}>
                    <TextCustom
                      color={defaultColors.c_0000}
                      fontSize={14}
                      weight="700">
                      Cơ sở:
                    </TextCustom>
                    <TextCustom
                      color={defaultColors.c_0000}
                      fontSize={14}
                      weight="400">
                      {' '}
                      102 Trường Trinh, Phương Mai, Đống Đa, Hà Nội
                    </TextCustom>
                  </View>
                  <View style={{marginTop: 16}}>
                    <View
                      style={[
                        globalStyles.row,
                        globalStyles.alignItemsCenter,
                        {
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                          height: 39,
                          backgroundColor: defaultColors._EA222A,
                          paddingLeft: 24,
                        },
                      ]}>
                      {titles.map((item, index) => {
                        return (
                          <View style={globalStyles.fullFill} key={index}>
                            <TextCustom
                              color={defaultColors.c_fff}
                              fontSize={14}
                              weight="700">
                              {item}
                            </TextCustom>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </>
            }
            data={data}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.styleItemList}>
                    <View style={globalStyles.fullFill}>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={12}
                        weight="400">
                        {item.code}
                      </TextCustom>
                    </View>
                    <View style={globalStyles.fullFill}>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={12}
                        weight="400">
                        {item.name}
                      </TextCustom>
                    </View>
                    <View style={globalStyles.fullFill}>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={12}
                        weight="400">
                        {item.quantity}
                      </TextCustom>
                    </View>
                    <View style={globalStyles.fullFill}>
                      <TextCustom
                        color={defaultColors.c_0000}
                        fontSize={12}
                        weight="400">
                        {item.quantity_cancel}
                      </TextCustom>
                    </View>
                  </View>
                  {item.items.map((_item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          globalStyles.row,
                          globalStyles.alignItemsCenter,
                          {
                            height: 40,
                            paddingLeft: 24,
                            borderBottomWidth: 1,
                            borderBottomColor: defaultColors.bg_EFEFEF,
                          },
                        ]}>
                        <View style={globalStyles.fullFill}>
                          <TextCustom
                            color={defaultColors.c_0000}
                            fontSize={12}
                            weight="400">
                            {_item.code}
                          </TextCustom>
                        </View>
                        <View style={globalStyles.fullFill}>
                          <TextCustom
                            color={defaultColors.c_0000}
                            fontSize={12}
                            weight="400">
                            {_item.name}
                          </TextCustom>
                        </View>
                        <View style={globalStyles.fullFill}>
                          <TextCustom
                            color={defaultColors.c_0000}
                            fontSize={12}
                            weight="400">
                            {_item.quantity}
                          </TextCustom>
                        </View>
                        <View style={globalStyles.fullFill}>
                          <TextCustom
                            color={defaultColors.c_0000}
                            fontSize={12}
                            weight="400">
                            {_item.quantity_cancel}
                          </TextCustom>
                        </View>
                      </View>
                    );
                  })}
                </>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: getValueForDevice(32, 24),
    flex: 1,
    zIndex: -1,
  },
  headerAction: {
    width: '100%',
    height: 48,
    ...globalStyles.row,
    ...globalStyles.alignItemsCenter,
    backgroundColor: defaultColors.c_222124,
    paddingHorizontal: 32,
    position: 'relative',
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    borderWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    backgroundColor: defaultColors.c_fff,
    // flex: 1,
    zIndex: -1,
  },
  styleGap25: {
    columnGap: 25,
  },
  styleItemList: {
    ...globalStyles.row,
    ...globalStyles.alignItemsCenter,
    height: 40,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_EFEFEF,
    backgroundColor: defaultColors._F8D5D5,
  },
  mt_40: {
    marginTop: 40,
  },
  colGap_50: {
    columnGap: 50
  }
});
