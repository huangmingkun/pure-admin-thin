<script setup lang="ts">
import { ref, onMounted, nextTick, reactive } from "vue";
import * as XLSX from "xlsx";
import { ElMessage } from "element-plus";
// @ts-ignore
import QRCode from "qrcodejs2-fix"; //  qrcodejs2只有js版本，需要安装qrcodejs2-fix版本才可以再ts中使用

const inputRef = ref(null);
const checkAll = ref(false);
const checkedHeadArr = reactive<{
  arr: string[];
}>({
  arr: []
});
let excelHeadArr = [];
const allHeadArr = reactive<{
  arr: string[];
}>({
  arr: []
});
let isIndeterminate = true;
const readExcelResult = ref([]);
const qrcodeRef = ref();
const checkFile = e => {
  const files = e.target.files;
  if (files.length <= 0) {
    //如果没有文件名
    return false;
  } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    ElMessage.error("上传格式不正确，请上传xls或者xlsx格式");
    return false;
  }
  return true;
};
// 读取Excel文件
const readExcel = e => {
  const flag = checkFile(e);
  if (!flag) return;
  const reader = new FileReader();
  reader.readAsArrayBuffer(e.target.files[0]);
  reader.onload = async ev => {
    try {
      readExcelResult.value = [];
      const data = ev.target.result;
      const workbook = XLSX.read(data, { type: "binary", cellDates: true });
      // 解析每个sheet表
      for (const sheet in workbook.Sheets) {
        // 避免直接使用对象原型链的hasOwnProperty方法，因为它可能会被重写
        if (Object.prototype.hasOwnProperty.call(workbook.Sheets, sheet)) {
          //解析excel文件得到数据
          readExcelResult.value = readExcelResult.value.concat(
            XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              /** Default value for null/undefined values */
              defval: "" //给defval赋值为空的字符串
            })
          );
        }
      }
      console.log("readExcelResult.value", readExcelResult.value);
      excelHeadArr = readExcelResult.value[0]
        ? Object.keys(readExcelResult.value[0])
        : []; // 列的表头名称
      allHeadArr.arr = excelHeadArr;
      inputRef.value.value = "";
    } catch (e) {
      return false;
    }
  };
};
onMounted(() => {
  nextTick(() => {
    inputRef.value.addEventListener("change", e => {
      readExcel(e);
    });
  });
});
// 二维码生成并下载点击事件
const qrcodeClick = async () => {
  if (readExcelResult.value.length === 0) {
    ElMessage.warning("请上传excel文件");
    return;
  }
  if (checkedHeadArr.arr.length === 0) {
    ElMessage.warning("请选择需要生成二维码的列数据");
    return;
  }
  const resDatas = readExcelResult.value;
  for (const i in resDatas) {
    let qrcodeValue = "";
    let qrcodeName = "";
    // 用户选择的表头字段后，根据已选字段数组checkedHeadArr从
    qrcodeValue = getQrcodeValue(i, resDatas);
    // qrcodeValue = Object.values();
    console.log("qrcodeValue", qrcodeValue);
    // qrcodeValue = resDatas[i]['固定资产编'] + ',' + resDatas[i]['设备型号'] + ',' + resDatas[i]['设备序列号'] + ',' + resDatas[i]['维保期']
    // 生成二维码（canvas）
    const res = await qrcode(qrcodeValue);
    // 由canvas生成二维码图片
    const img = await convertCanvasToImage(res);
    // 二维码名称由选择第一个选择的列数据决定
    qrcodeName = resDatas[i][checkedHeadArr.arr[0]] || null;
    img.name = `${parseInt(i) + 1}-${qrcodeName}-测试图片`;
    // 防止重复加载，加载前先清空装img 的容器
    console.log("qrcodeRef.value====", qrcodeRef.value);
    qrcodeRef.value.innerHTML = "";
    // qrcode表示你要插入的容器id
    qrcodeRef.value.appendChild(img);
    // 生成后自动下载
    await downLoadCode();
  }
};
// 生成二维码事件
const qrcode = qrcodeValue => {
  return new Promise((resolve, reject) => {
    // 二维码参数初始化
    const qrcode = new QRCode("qrcode", {
      width: 100,
      height: 100, // 高度
      text: qrcodeValue, // 二维码内容
      image: "",
      render: "canvas" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      // background: '#f0f'
      // foreground: '#ff0'
    });
    // 获取页面的cavase对象插入DOM中
    const mycanvas1 = document.getElementsByTagName("canvas")[0];
    resolve(mycanvas1);
  });
};
// canvas转换图片时需要的方法
// 从canvas中提取图片image
const convertCanvasToImage = canvas => {
  return new Promise((resolve, reject) => {
    // 新Image对象，可以理解为DOM
    const image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
    // 指定格式PNG
    image.src = canvas.toDataURL("image/png");
    resolve(image);
  });
};
// 下载二维码图片
const downLoadCode = () => {
  return new Promise((resolve, reject) => {
    const imgSrc = qrcodeRef.value.children[0]?.src;
    const imgName = qrcodeRef.value.children[0]?.name;
    console.log(44444444, imgName, imgSrc);
    const alink = document.createElement("a");
    alink.href = imgSrc;
    alink.download = imgName + ".png";
    alink.click();
    // 因为浏览器线程有限，下载图片的并发量有限，因此下载图片的函数需要进行延迟操作（防止批量下载图片进程超出浏览器的线程上限）
    setTimeout(function () {
      resolve("successs");
    }, 1000);
  });
};
const getQrcodeValue = (i, resDatas) => {
  let tempQecodeValue = "";
  checkedHeadArr.arr.forEach(function (item, key) {
    if (key === 0) {
      tempQecodeValue = resDatas[i][item];
    } else {
      tempQecodeValue += "，" + resDatas[i][item];
    }
  });
  return tempQecodeValue;
};
// 表头数据全选操作
const handleCheckAllChange = val => {
  checkedHeadArr.arr = val ? excelHeadArr : [];
  isIndeterminate = false;
};
// 表头数据单选操作
const handleCheckedChange = value => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allHeadArr.arr.length;
  isIndeterminate = checkedCount > 0 && checkedCount < allHeadArr.arr.length;
};
</script>

<template>
  <div>
    <el-tooltip class="margin-auto" placement="right">
      <template #content>
        <div>
          <p>
            （1）第一个选择的列表头，对应列的值会作为二维码图片的名称（对应列没值则为null）
          </p>
          <p>（2）选择列表头的顺序会决定二维码内容显示的顺序</p>
        </div>
      </template>
      <el-button>使用说明</el-button>
    </el-tooltip>
    <input
      class="margin-auto"
      style="display: block"
      ref="inputRef"
      type="file"
      accept=".xlsx, .xls"
    />
    <div class="container">
      <div class="excel-datas">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div style="margin: 15px 0" />
        <el-checkbox-group
          v-model="checkedHeadArr.arr"
          @change="handleCheckedChange"
        >
          <el-checkbox
            v-for="head in allHeadArr.arr"
            :label="head"
            :key="head"
            >{{ head }}</el-checkbox
          >
        </el-checkbox-group>
        <el-table :data="readExcelResult" style="width: 100%" height="250">
          <el-table-column
            v-for="(item, idx) in allHeadArr.arr"
            :key="item + idx"
            :prop="item"
            :label="item"
          />
        </el-table>
      </div>
      <!--生成二维码-->
      <el-button class="margin-auto" type="primary" @click="qrcodeClick()">
        生成二维码
      </el-button>
      <!--生成二维码的位置-->
      <div class="qrcode-position" ref="qrcodeRef" id="qrcode" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.margin-auto {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
