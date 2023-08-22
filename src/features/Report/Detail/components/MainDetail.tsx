import { defaultColors } from '@configs';
import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { globalStyles } from 'src/commons/globalStyles';
// import { Dirs, FileSystem } from "react-native-file-access";
// const DDP = Dirs.DocumentDir + "/";
import { TextCustom } from '@components';
import { isIOS } from '@constants';
import RNFetchBlob from 'rn-fetch-blob';
import { IReportDist } from 'src/api/report';
import { getValueForDevice } from 'src/commons/formatMoney';
import { handleSelectResourses } from 'src/commons/permissionUtil';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import SpaceBottom from 'src/components/SpaceBottom';
import XLSX from 'xlsx-js-style';
import { GroupAction } from './GroupAction';
import { ExportPDF } from './ExportPDF';
import { FomatDateYY_MM_DD, FomatDateYY_MM_DD_H_M } from 'src/commons/formatDate';
import { useAreaName } from 'src/redux/infoDrawer/hooks'
import { useUserInfo } from 'src/redux/reducers/hook'
const {
  dirs: {DownloadDir, DocumentDir},
} = RNFetchBlob.fs;

const titles = ['Mã món ăn', 'Món ăn', 'Số lượng bán', 'Số lượng hủy'];

export enum FileType {
  pdf = 'PDF',
  excel = 'EXCEL',
}

type Props = {
  setIsOpenTab: React.Dispatch<React.SetStateAction<boolean>>
  dataReport :IReportDist[]
};

export const MainDetail = ({setIsOpenTab ,dataReport}: Props) => {

  const nameArea = useAreaName()
  const userInfo = useUserInfo()

  const downloadPdf = useCallback(async () => {
    const aPath = Platform.select({
      ios: DocumentDir,
      android: DownloadDir,
    });
    const html = ExportPDF(titles, dataReport);
    let options = {
      html: html,
      fileName: 'doanh-thu5',
      directory: aPath + 'test.pdf',
    };

    await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert('Tải file thành công');
  }, [dataReport]);

  const dateExport = useMemo(() => {
    const newDate = new Date();
    return `${FomatDateYY_MM_DD(newDate.toISOString())} ${FomatDateYY_MM_DD(newDate.toISOString(), true)}` 
  }, [])

  const exportExcelFIle = useCallback(() => {
    let wb = XLSX.utils.book_new();
    const data_sheet = [
      [
        `Ngày cấp: ${dateExport}`,
        `Người lập: ${userInfo?.fullname}`,
        `Cơ sở ${nameArea}`,
      ],
      ['Báo cáo món ăn Bán - Hủy'],
      [nameArea],
      titles,
    ];

    dataReport.forEach(item => {
      const _item = [
        `${item.id}`,
        item.name,
        `${item.quantitySuccess}`,
        `${item.quantityCancel}`,
      ];
      data_sheet.push(_item);
      item.list.forEach(_i => {
        data_sheet.push([
          `${_i.id}`,
          _i.name,
          `${_i.quantitySuccess}`,
          `${_i.quantitySuccess}`,
        ]);
        _i.list?.forEach(_j => {
          data_sheet.push([
            `${_j.id}`,
            _j.name,
            `${_j.quantitySuccess}`,
            `${_j.quantitySuccess}`,
          ]);
        });
      });
    });
    const wsrows = [{}, {}, {}, {hpx: 50}];
    const sizes = [
      {wpx: 150},
      {wpx: 100},
      {wpx: 200},
      {wpx: 200},
      {wpx: 100},
      {wpx: 100},
    ];

    let ws = XLSX.utils.aoa_to_sheet(data_sheet);
    const merge = [
      // {s: {r: 0, c: 0}, e: {r: 0, c: 1}},
      {s: {r: 0, c: 2}, e: {r: 0, c: 3}},
      {s: {r: 1, c: 0}, e: {r: 1, c: 3}},
      {s: {r: 2, c: 0}, e: {r: 2, c: 3}},
    ];

    ws['!cols'] = sizes;
    ws['!rows'] = wsrows;
    ws['!merges'] = merge;

    ws.A2.s = {
      alignment: {
        vertical: 'center',
        horizontal: 'center',
        wrapText: '1', // any truthy value here
      },
      font: {
        name: 'Times New Roman',
        bold: true,
        color: {rgb: '000000'},
        sz: 32,
      },
    };

    ws.A3.s = {
      alignment: {
        vertical: 'center',
        horizontal: 'center',
        wrapText: '1', // any truthy value here
      },
      font: {name: 'Times New Roman', color: {rgb: '000000'}, sz: 12},
    };

    ws.A1.s = {
      font: {
        name: 'Times New Roman',
        color: {rgb: '000000'},
        sz: 12,
      },
      alignment: {
        vertical: 'center',
        horizontal: 'left',
        wrapText: '1', // any truthy value here
      }
    };
    ws.B1.s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
      },
      alignment: {
        vertical: 'center',
        horizontal: 'right',
        wrapText: '1', // any truthy value here
      },
    };

    ws.C1.s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        color: {rgb: '000000'},
      },
      alignment: {
        vertical: 'center',
        horizontal: 'right',
        wrapText: '1', // any truthy value here
      },
    };

    const styleThead = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        color: {rgb: 'FFFFFF'},
      },
      alignment: {
        vertical: 'center',
        horizontal: 'left',
        wrapText: '1', // any truthy value here
      },
      fill: {fgColor: {rgb: 'EA222A'}},
    };

    ws.A4.s = styleThead;
    ws.B4.s = styleThead;
    ws.C4.s = styleThead;
    ws.D4.s = {
      font: {
        name: 'Times New Roman',
        sz: 12,
        color: {rgb: 'FFFFFF'},
      },
      alignment: {
        vertical: 'center',
        horizontal: 'right',
        wrapText: '1', // any truthy value here
      },
      fill: {fgColor: {rgb: 'EA222A'}},
    };

    const border = {
      bottom: {
        style: 'thin',
        color: {rgb: '000000'},
      },
    };

    const styleGroup = {
      font: {
        sz: 12,
        border: true,
        color: {rgb: '000000'},
      },
      alignment: {
        vertical: 'center',
        horizontal: 'left',
        wrapText: '1', // any truthy value here
      },
      fill: {fgColor: {rgb: 'F4CCCC'}},
      border,
    };

    const styleCell2 = {
      font: {
        sz: 12,
        color: {rgb: '000000'},
      },
      alignment: {
        vertical: 'center',
        horizontal: 'left',
        wrapText: '1', // any truthy value here
      },
      border,
    };
    let count = 5;
    dataReport.forEach((item, index) => {
      const parentIndex = count; // Lưu lại chỉ số của phần tử cha
      count++;
      ws[`A${parentIndex}`].s = styleGroup;
      ws[`B${parentIndex}`].s = styleGroup;
      ws[`C${parentIndex}`].s = styleGroup;
      ws[`D${parentIndex}`].s = {
        font: {
          sz: 12,
          color: {rgb: '000000'},
        },
        alignment: {
          vertical: 'center',
          horizontal: 'right',
          wrapText: '1', // any truthy value here
        },
        fill: {fgColor: {rgb: 'F4CCCC'}},
        border,
      };
      item?.list?.forEach((_child, _index) => {
        const checkHadChild = !!_child.list;
        const styleCell = {
          font: {
            sz: 12,
            color: {rgb: '000000'},
          },
          alignment: {
            vertical: 'center',
            horizontal: 'left',
            wrapText: '1', // any truthy value here
          },
          fill: {fgColor: {rgb: checkHadChild ? 'FCE5CD' : 'FFFFFF'}},
          border,
        };
        const childIndex = count;
        count++;
        ws[`A${childIndex}`].s = styleCell;
        ws[`B${childIndex}`].s = styleCell;
        ws[`C${childIndex}`].s = styleCell;
        ws[`D${childIndex}`].s = {
          font: {
            sz: 12,
            border: true,
            color: {rgb: '000000'},
          },
          alignment: {
            vertical: 'center',
            horizontal: 'right',
            wrapText: '1', // any truthy value here
          },
          fill: {fgColor: {rgb: checkHadChild ? 'FCE5CD' : 'FFFFFF'}},
          border,
        };
        _child.list?.forEach((_child2, _index) => {
          const childIndex2 = count;
          count++;
          ws[`A${childIndex2}`].s = styleCell2;
          ws[`B${childIndex2}`].s = styleCell2;
          ws[`C${childIndex2}`].s = styleCell2;
          ws[`D${childIndex2}`].s = {
            font: {
              sz: 12,
              border: true,
              color: {rgb: '000000'},
            },
            alignment: {
              vertical: 'center',
              horizontal: 'right',
              wrapText: '1', // any truthy value here
            },
            border,
          };
        });
      });
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Báo cáo');
    const wbout = XLSX.write(wb, {type: 'buffer', bookType: 'xlsx'});
    // const blob = new Blob([wbout], {
    //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   });

    const aPath = Platform.select({
      ios: DocumentDir,
      android: DownloadDir,
    });

    RNFetchBlob.fs
      .writeFile(aPath + '/bao-cao-mon-an-ban-huy.xlsx', Array.from(wbout), 'ascii')
      .then(() => {
        // Share.share(aPath + '/bao-cao123.xlsx')
        alert(
          'Tải tệp thành công, địa chỉ tệp ở: ' +
            aPath +
            '/bao-cao-mon-an-ban-huy.xlsx',
        );
      });
   } , [dataReport, nameArea, userInfo?.fullname]);

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
  }, [downloadPdf ,exportExcelFIle]);

  const renderItem = useCallback((item: ListRenderItemInfo<IReportDist>) => {
    return <RenderItemReport item={item.item} index={1} />;
  }, []);

  return (
    <View style={globalStyles.fullFill}>
      <ButtonMenuTabBar onPress={setIsOpenTab} />
      <View style={styles.container}>
        <GroupAction onDownload={handleDownload} />
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ListHeaderComponent dateExport={dateExport} />}
            ListFooterComponent={<SpaceBottom />}
            data={dataReport}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const RenderItemReport = ({
  item,
  index,
}: {
  item: IReportDist
  index?: number
}) => {
  const indexValueCheck = item.list ? 2 : 3;
  const backgroundColorValue = {
    [1]: defaultColors._F8D5D5,
    [2]: defaultColors._FFDB9E,
    [3]: defaultColors.c_fff,
  };

  return (
    <>
      <View
        style={[
          styles.styleItemList,
          {backgroundColor: backgroundColorValue[index || indexValueCheck]},
        ]}>
        <View style={globalStyles.fullFill}>
          <TextCustom color={defaultColors.c_0000} numberOfLines={2} fontSize={12} weight="400">
            {item.id}
          </TextCustom>
        </View>
        <View style={globalStyles.fullFill}>
          <TextCustom color={defaultColors.c_0000} numberOfLines={2} fontSize={12} weight="400">
            {item.name}
          </TextCustom>
        </View>
        <View style={globalStyles.fullFill}>
          <TextCustom color={defaultColors.c_0000} fontSize={12} weight="400">
            {item.quantitySuccess}
          </TextCustom>
        </View>
        <View style={globalStyles.fullFill}>
          <TextCustom color={defaultColors.c_0000} fontSize={12} weight="400">
            {item.quantityCancel}
          </TextCustom>
        </View>
      </View>
      {item?.list?.map((_item, index) => {
        return <RenderItemReport key={index} item={_item} />;
      })}
    </>
  );
};

type PropsListHeaderComponent ={
  dateExport: string
}

const ListHeaderComponent = ({dateExport}:PropsListHeaderComponent) => {
  const nameArea = useAreaName()
  const userInfo = useUserInfo()
   return (
    <>
    <View
      style={[
        globalStyles.row,
        globalStyles.justifyContentBetween,
        styles.colGap_50,
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
            {dateExport}
          </TextCustom>
        </View>
        <View style={globalStyles.row}>
          <TextCustom
            color={defaultColors.c_0000}
            fontSize={14}
            weight="700">
            Người lập{' '}
          </TextCustom>
          <TextCustom
            color={defaultColors.c_0000}
            fontSize={14}
            weight="400">
            {' '}
            {userInfo?.fullname}
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
          {nameArea}
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
          {marginTop: 16, flexWrap: 'wrap'},
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
         {nameArea}
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
    columnGap: 50,
  },
});
