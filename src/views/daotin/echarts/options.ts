const data2 = {
	升级成功: 12,
	升级失败: 42,
	升级中: 31,
	待升级: 21,
}

const data3 = [
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-16 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-17 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-18 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-19 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-20 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-21 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-22 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-23 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-24 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-25 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-26 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-27 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-28 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-29 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-04-30 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-01 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-02 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-03 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-04 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-05 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-06 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-07 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-08 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-09 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-10 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-11 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-12 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-13 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-14 00:00:00',
	},
	{
		deviceCount: 161050,
		onlineCount: 187257,
		time: '2024-05-15 00:00:00',
	},
]

const data7 = [10, 18, 15, 6, 12]
const max7 = data7.reduce((pre, cur) => (pre > cur ? pre : cur), 0)

export const options = [
	// 1
	{
		title: {
			text: '使用示例',
			subtext: '二级标题',
			subTextStyle: {
				fontSize: 16,
				fontWeight: 'normal',
				left: 'center',
				y: 'center',
			},
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					width: 1,
					color: '#008000',
				},
			},
		},
		grid: {
			left: '1%',
			right: '1%',
			bottom: '1%',
			top: '60px',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
			axisLabel: {
				interval: 0,
				rotate: 30,
			},
		},
		yAxis: {
			axisLabel: {
				formatter: (val: number) => {
					return val
				},
			},
		},
		series: [
			{
				name: '收入',
				type: 'bar',
				stack: 'Total',
				data: [200, 301, 402, 503, 604, 705, 806],
			},
			{
				name: '支出',
				type: 'line',
				stack: 'Total',
				data: [100, 210, 1020, 230, 20, 250, 60],
			},
		],
	},
	// 2饼图，自定义图例
	{
		tooltip: {
			trigger: 'item',
		},
		legend: {
			icon: 'circle', // 圆形图例样式
			orient: 'vertical', // 竖向排列
			left: 'right', // 图例在右边
			top: 'middle', // 图例中中间
			align: 'left', // 图例的颜色块在左边
			itemGap: 20, // 图例之间的间距
			itemWidth: 8, // 图例的宽度
			padding: [0, 50, 0, 0], // 图例的内边距
			formatter: function (name) {
				// 图例名称的格式化
				let curr = data2[name]
				return `{a|${name}} {b|${((curr / 106) * 100).toFixed(2)}%} {c|${curr}个}`
			},
			textStyle: {
				rich: {
					a: {
						width: 60,
						color: '#138ECE',
					},
					b: {
						width: 60,
						color: '#CC56BF',
					},
					c: {
						color: '#FFA200',
					},
				},
			},
		},
		series: [
			{
				name: '升级任务状态',
				type: 'pie',
				radius: '60%',
				avoidLabelOverlap: true, // 防止label标签重叠
				// itemStyle: {
				//   borderRadius: 4,
				//   borderColor: "#26294a",
				//   borderWidth: 2
				// },
				center: ['20%', '50%'],
				label: {
					show: false,
				},
				labelLine: {
					show: false,
				},
				data: [
					{ value: 21, name: '待升级' },
					{ value: 31, name: '升级中' },
					{ value: 12, name: '升级成功' },
					{ value: 42, name: '升级失败' },
				],
			},
		],
	},
	// 3柱状图
	{
		legend: {
			show: true,
			top: '10',
			right: '0',
			itemWidth: 8,
			itemHeight: 8,
			icon: 'rect',
			selectedMode: true,
			textStyle: {
				color: '#f00',
			},
			itemGap: 60,
			data: [
				{
					name: '在线模组数',
					icon: 'rect',
				},
				{
					name: '模组总数',
					icon: 'rect',
				},
			],
		},
		tooltip: {
			show: true,
			trigger: 'axis',
			formatter: params => {
				const [first] = params
				const { dataIndex = 0 } = first || {}
				const item = data3[dataIndex] || {}
				// 在线比例
				const onlineRate = item.deviceCount ? ((item.onlineCount / item.deviceCount) * 100).toFixed(2) : 0
				return `
          ${item.time}<br/>
          在线模组:${item.onlineCount}<br/>
          模组总数:${item.deviceCount}<br/>
          在线比例:${onlineRate}%
          `
				// console.log(params);
			},
		},
		grid: {
			containLabel: true, // grid 区域包含坐标轴的刻度标签
			left: '30',
			right: '0',
			top: '40',
			bottom: '10',
		},
		yAxis: [
			{
				name: `模组个数`,
				type: 'value',
				axisLabel: {
					color: '#999999',
				},
				minInterval: 1,
				axisLine: {
					lineStyle: {
						color: '#DCDCDC',
					},
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: '#DCDCDC',
					},
				},
				nameTextStyle: {
					color: '#999999',
				},
			},
		],
		xAxis: {
			type: 'category',
			data: [
				'2024-04-16',
				'2024-04-17',
				'2024-04-18',
				'2024-04-19',
				'2024-04-20',
				'2024-04-21',
				'2024-04-22',
				'2024-04-23',
				'2024-04-24',
				'2024-04-25',
				'2024-04-26',
				'2024-04-27',
				'2024-04-28',
				'2024-04-29',
				'2024-04-30',
				'2024-05-01',
				'2024-05-02',
				'2024-05-03',
				'2024-05-04',
				'2024-05-05',
				'2024-05-06',
				'2024-05-07',
				'2024-05-08',
				'2024-05-09',
				'2024-05-10',
				'2024-05-11',
				'2024-05-12',
				'2024-05-13',
				'2024-05-14',
				'2024-05-15',
			],
			axisLabel: {
				color: '#999999',
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					// color: "#DCDCDC"
				},
			},
		},
		series: [
			{
				name: '在线模组数',
				type: 'bar',
				stack: '总量',
				barMaxWidth: 12,
				data: [
					185257, 187257, 183257, 18457, 187255, 137257, 14257, 127257, 18257, 187257, 187257, 187257, 187257, 187257,
					127257, 187257, 187257, 18727, 187257, 127257, 18257, 187257, 12257, 187257, 187257, 187257, 187257, 12257,
					187257, 127257,
				],
				itemStyle: {
					// barBorderRadius: 6,
					color: '#1890ff',
					borderColor: '#1890ff',
				},
			},
			{
				name: '模组总数',
				type: 'bar',
				stack: '总量',
				barMaxWidth: 12,
				data: [
					161050, 161050, 161050, 16130, 161450, 161050, 161050, 161050, 161050, 161050, 16450, 161050, 161050, 161050,
					161050, 161050, 161050, 161050, 161040, 16140, 16140, 161050, 161050, 16450, 161050, 161050, 161050, 16104,
					161050, 161050,
				],
				itemStyle: {
					barBorderRadius: [10, 10, 0, 0],
					borderColor: '#1890ff',
					color: '#f0f0f0',
				},
			},
		],
	},
	// 4bar
	{
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: 'line', // 默认为直线，可选为：'line' | 'shadow'
			},
			backgroundColor: '#fff',
			textStyle: {
				width: 300,
				color: '#666',
			},
			padding: [16, 16, 10, 16],
			extraCssText: 'border-radius: 8px;',
			formatter: function (params) {
				// console.log('params==>', params)
				var tal = 0

				params.forEach(function (item) {
					tal += Number(item.value)
				})
				var result = /*html*/ `
            <div style="margin-bottom: 6px; width: 200px;">
              <div style="margin-bottom: 6px;white-space: normal;word-wrap: break-word;word-break: break-all;">${params[0].axisValueLabel}</div>
            </div>` // 当前的轴标签

				params.forEach(function (item) {
					var color = item.color
					result += /*html*/ `
              <div style="margin-bottom: 6px; display: flex; justify-content: space-between;">
                  <span>
                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:7px;height:7px;background-color:${color};"></span>
                  ${item.seriesName}
                  </span> ${item.value}
              </div>`
				})
				return result
			},
		},
		legend: {
			icon: 'circle', // 设置图例图标为圆形
			itemWidth: 12,
			itemGap: 80,
			bottom: 20,
			orient: 'horizontal',
			itemStyle: {
				borderRadius: 10, // 圆形半径
			},
			data: ['处理中问题数', '已完结问题数', '已关闭问题数'],
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '80px',
			top: '3%', // 调整顶部边距
			containLabel: true,
		},
		xAxis: {
			type: 'value',
			// 隐藏x轴线条，保留刻度
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#E0E6F1',
				},
			},
		},
		yAxis: {
			type: 'category',
			inverse: true, // y轴反向,Y 轴默认是从下往上的
			data: [
				'天喻-TYCOSV41-TYCOS V41_2-存量版本-检测不通过',
				'天喻-TYCOSV40-TYCOS V40_2-存量版本-检测中',
				'握奇-V5.8-COS2023608B8850-存量版本-检测中',
				'天喻-TYBJ-TYBJ1.2-新版本-检测中',
				'天喻-TYCOSV43-TYCOS V41_3（江苏版本）-存量版本-检测中',
				'东信-FIJ V1.1-FIJ V1.1_23.1-存量版本-检测中',
				'握奇-V5.8-COS2020608B8850-存量版本-检测中',
				'握奇-V5.8-COS2022608B8850-存量版本-检测中',
				'天喻-TYA-1-1-新版本-检测中',
				'捷德-V2.1-StarChina V3-CNUV104-存量版本-检测中',
			],
			axisTick: {
				alignWithLabel: true,
			},
			interval: 0, // 强制显示所有类别
		},
		series: [
			{
				name: '适配应用数量',
				type: 'bar',
				stack: '总量',
				barWidth: 11,
				itemStyle: {
					color: '#06CB55', // 设置柱状条的颜色
				},
				data: [1, 2, 3, 4],
			},
			{
				name: '未适配应用数量',
				type: 'bar',
				stack: '总量',
				barWidth: 11,
				itemStyle: {
					color: '#FF4949',
				},
				data: [1, 2, 3, 4],
			},
		],
	},
	// 5
	{
		tooltip: {
			trigger: 'item',
		},
		legend: {
			type: 'scroll',
			orient: 'horizontal',
			// right: 10,
			// top: 20,
			bottom: 20,
			// bottom: 0,
			itemWidth: 12,
			// itemGap: 20,
			itemStyle: {
				borderRadius: 10, // 圆形半径
			},
			// formatter: function (name) {
			// 	// 定义每个图例项的宽度
			// 	var maxWidth = 100 // 设置最大宽度，例如100像素
			// 	return '{a|' + name + '}'
			// },
			// textStyle: {
			// 	rich: {
			// 		a: {
			// 			width: 80, // 确保每个图例项的宽度相同
			// 			align: 'left',
			// 		},
			// 	},
			// },
			icon: 'circle', // 设置图例图标为圆形
		},
		series: [
			{
				name: '',
				type: 'pie',
				radius: '40%',
				center: ['50%', '50%'],
				// hoverOffset: 0, // 鼠标悬停时图形不放大
				// minAngle: 15, //最小角度
				// startAngle: 15, //起始角度
				avoidLabelOverlap: true, // 是否启用防止标签重叠策略
				data: [
					{
						name: '互联网公司',
						value: '87.25',
					},
					{
						name: '江苏',
						value: '12.75',
					},
				],
				label: {
					// formatter: ({ data }) => {
					// 	console.log(data)
					// 	return `${data.name}: ${data.percent}%`
					// },
					formatter: chart => {
						const name = chart.data['name']
						const value = chart.data['value']

						const label = `${name}: ${value}%`

						// return pieLabelFormatter(label, 12)
						return label
					},
					// overflow: 'breakAll',
					// ellipsis: '...', // 省略号
				},
				// emphasis: {
				// 	itemStyle: {
				// 		shadowBlur: 10,
				// 		shadowOffsetX: 0,
				// 		shadowColor: 'rgba(0, 0, 0, 0)',
				// 	},
				// },
			},
		],
	},
	// 6
	{
		title: {},
		tooltip: {
			trigger: 'axis',
		},
		color: ['#00FF6C', '#FF9000', '#00E4FF'],
		legend: {
			data: [
				{ name: '卡1', itemStyle: { opacity: 0 } },
				{ name: '卡2', itemStyle: { opacity: 0 } },
				{ name: '卡3', itemStyle: { opacity: 0 } },
			],
			top: '60',
			right: 40,
			textStyle: {
				color: '#A2D4E6',
			},
			itemGap: 30,
		},
		grid: {
			left: '50',
			right: '50',
			top: '100',
			bottom: '20',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['2020', '2021', '2022', '2023', '2024'],
			axisLabel: {
				color: '#A2D4E6',
			},
			axisLine: {
				lineStyle: {
					color: '#A2D4E6',
				},
			},
		},
		yAxis: {
			type: 'value',
			splitLine: {
				show: false, // 不显示网格线
			},
			axisLabel: {
				color: '#A2D4E6',
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#A2D4E6',
				},
			},
		},
		series: [
			{
				name: '卡1',
				type: 'line',
				data: [14, 5, 6, 9, 18],
			},
			{
				name: '卡2',
				type: 'line',
				data: [10, 9, 14, 17, 13],
			},
			{
				name: '卡3',
				type: 'line',
				data: [6, 11, 13, 15, 4],
			},
		],
	},
	// 7
	{
		color: [
			{
				type: 'linear',
				x: 0,
				x2: 0,
				y: 0,
				y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(255,179,70, 1)',
					},
					{
						offset: 1,
						color: 'rgba(255,179,70, 0.1)',
					},
				],
			},
		],
		tooltip: {
			trigger: 'axis',
		},
		grid: {
			left: '50',
			right: '50',
			top: '50',
			bottom: '20',
			containLabel: true,
		},
		xAxis: [
			{
				type: 'category',
				data: ['卡商1', '卡商2', '卡商3', '卡商4', '卡商5'],
				axisLabel: {
					color: '#A2D4E6',
				},
				axisLine: {
					lineStyle: {
						color: '#A2D4E6',
					},
				},
			},
			{
				type: 'category',
				show: false,
				data: ['卡商1', '卡商2', '卡商3', '卡商4', '卡商5'],
				axisPointer: {
					show: false,
				},
			},
		],
		yAxis: {
			type: 'value',
			splitLine: {
				show: false, // 不显示网格线
			},
			axisLabel: {
				color: '#A2D4E6',
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#A2D4E6',
				},
			},
		},
		series: [
			{
				data: data7,
				barWidth: 10,
				type: 'bar',
				itemStyle: {
					borderRadius: [10, 10, 0, 0], // Round the top of the bars
				},
			},
			{
				xAxisIndex: 1,
				itemStyle: {
					color: 'rgba(251, 177, 70, 0.16)',
				},
				data: data7.map(() => max7),
				barWidth: 20,
				type: 'bar',
			},
		],
	},
	// 8
	{
		tooltip: {
			// show: false,
			trigger: 'item',
			formatter: function (params) {
				// 使用params.marker来显示图例颜色圆圈
				return params.marker + params.name + ': ' + params.value + '%'
			},
		},
		legend: {
			bottom: 0,
			textStyle: {
				color: '#A1E8FB',
			},
			icon: 'circle',
			itemWidth: 8, // 设置图例标记的宽度
			itemHeight: 8, // 设置图例标记的高度
			itemGap: 20,
		},

		series: [
			{
				name: '',
				type: 'pie',
				radius: [0, '40%'],
				center: ['50%', '50%'],
				avoidLabelOverlap: true, // 是否启用防止标签重叠策略
				data: [
					{
						name: '芯片厂商1',
						value: 38,
					},
					{
						name: '芯片厂商2',
						value: 28,
					},
					{
						name: '芯片厂商3',
						value: 34,
					},
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
				label: {
					color: '#00C8FE',
				},
			},
		],
	},
	// 9
	{
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		legend: {
			data: ['产品1', '产品2', '产品3'],
			textStyle: {
				color: '#A2D4E6',
			},
			itemGap: 30,
			icon: 'rect',
			itemWidth: 40,
			itemHeight: 2,
			right: 20,
			top: 20,
		},
		grid: {
			left: '20',
			right: '20',
			bottom: '20',
			containLabel: true,
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			splitLine: {
				show: false, // 不显示网格线
			},
			axisLabel: {
				color: '#A2D4E6',
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#A2D4E6',
				},
			},
		},
		yAxis: {
			type: 'category',
			data: ['卡商1', '卡商2', '卡商3', '卡商4'],
			inverse: true,
			axisLabel: {
				color: '#A2D4E6',
			},
			axisLine: {
				lineStyle: {
					color: '#A2D4E6',
				},
			},
		},
		series: [
			{
				name: '产品1',
				type: 'bar',
				barWidth: 10,
				data: [16, 21, 8, 13],
				itemStyle: {
					borderRadius: [0, 10, 10, 0],
				},
			},
			{
				name: '产品2',
				type: 'bar',
				barWidth: 10,
				data: [25, 7, 11, 12],
				itemStyle: {
					borderRadius: [0, 10, 10, 0],
				},
			},
			{
				name: '产品3',
				type: 'bar',
				barWidth: 10,
				data: [15, 17, 9, 14],
				itemStyle: {
					borderRadius: [0, 10, 10, 0],
				},
			},
		],
	},
]
