import Link from 'next/link'

export default function HealthCheck() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '20px' }}>
          ✅ 网站运行正常
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>
          这是一个健康检查页面，用于验证网站是否正常运行。
        </p>
        <div style={{ marginBottom: '20px' }}>
          <p><strong>时间:</strong> {new Date().toLocaleString('zh-CN')}</p>
          <p><strong>状态:</strong> 🟢 在线</p>
          <p><strong>版本:</strong> Next.js 15.4.5</p>
        </div>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          返回首页
        </Link>
        <Link
          href="/test"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px'
          }}
        >
          测试页面
        </Link>
      </div>
    </div>
  )
}
