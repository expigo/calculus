import { motion } from 'framer-motion'
import Plot from 'react-plotly.js'

export default function InteractivePlot({ data, layout, config, title = '' }) {
  const defaultLayout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(255,255,255,0.02)',
    font: {
      color: '#e5e7eb',
      family: 'Inter, system-ui, sans-serif',
    },
    xaxis: {
      gridcolor: 'rgba(255,255,255,0.1)',
      zerolinecolor: 'rgba(255,255,255,0.2)',
      ...layout?.xaxis,
    },
    yaxis: {
      gridcolor: 'rgba(255,255,255,0.1)',
      zerolinecolor: 'rgba(255,255,255,0.2)',
      ...layout?.yaxis,
    },
    margin: { t: 40, r: 40, b: 40, l: 60 },
    ...layout,
  }

  const defaultConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    ...config,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8"
    >
      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden p-6">
        {title && (
          <h4 className="text-lg font-semibold mb-4 text-white">{title}</h4>
        )}
        <div className="w-full">
          <Plot
            data={data}
            layout={defaultLayout}
            config={defaultConfig}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
          />
        </div>
      </div>
    </motion.div>
  )
}
